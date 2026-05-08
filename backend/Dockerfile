# =============================================================
# Dockerfile — Portfolio Spring Boot Backend
# Multi-stage build: keeps the final image lean (~200MB)
# =============================================================

# ── Stage 1: BUILD ──────────────────────────────────────────
# Use the official Maven image with Java 21 to compile the app
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Set working directory inside the build container
WORKDIR /app

# Copy only the pom.xml first → download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the full source code
COPY src ./src

# Build the fat JAR, skipping tests (tests run separately in CI)
RUN mvn clean package -DskipTests -B

# ── Stage 2: RUNTIME ────────────────────────────────────────
# Use a slim Java 21 JRE — no Maven/SDK needed at runtime
FROM eclipse-temurin:17-jre-jammy

# Metadata labels (good practice for Docker Hub)
LABEL maintainer="Yaswanth <yash95632@gmail.com>"
LABEL org.opencontainers.image.title="portfolio-backend"
LABEL org.opencontainers.image.description="Spring Boot REST API for Portfolio (Java 17)"
LABEL org.opencontainers.image.source="https://github.com/Yaswanth0324/Yash-portfolio-react"

# Create a non-root user for security (never run as root in prod)
RUN groupadd --system appgroup && useradd --system --gid appgroup appuser

# Set working directory
WORKDIR /app

# Copy only the compiled JAR from the builder stage
COPY --from=builder /app/target/portfolio-backend-*.jar app.jar

# Give ownership to the non-root user
RUN chown appuser:appgroup app.jar

# Switch to non-root user
USER appuser

# Render injects PORT dynamically; default to 8080 for local Docker
ENV PORT=8080

# Expose the port (documentation only — Render/Railway map it automatically)
EXPOSE 8080

# JVM tuning for containers:
#   -XX:+UseContainerSupport  → respects cgroup memory limits
#   -XX:MaxRAMPercentage=75   → uses 75% of container RAM for heap
#   -Djava.security.egd      → faster startup on Linux containers
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
