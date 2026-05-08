package com.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${allowed.origins:https://yash-portfolio-react-kappa.vercel.app}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] originsArray = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                // Strip trailing slash if present, because browsers send Origin without it
                .map(o -> o.endsWith("/") ? o.substring(0, o.length() - 1) : o)
                .toArray(String[]::new);

        registry.addMapping("/api/**")
                .allowedOrigins(originsArray)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
