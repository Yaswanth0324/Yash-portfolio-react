package com.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${allowed.origins:https://yash-portfolio-react-kappa.vercel.app}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        List<String> originsList = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .map(o -> o.replaceAll("^\"|\"$", ""))
                .map(o -> o.replaceAll("^'|'$", ""))
                .map(o -> o.endsWith("/") ? o.substring(0, o.length() - 1) : o)
                .toList();

        System.out.println("=================================================");
        System.out.println("CORS Configuration Active");
        System.out.println("Allowed Origins: " + originsList);
        System.out.println("=================================================");

        registry.addMapping("/api/**")
                .allowedOriginPatterns(originsList.toArray(new String[0]))
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);

    }
}
