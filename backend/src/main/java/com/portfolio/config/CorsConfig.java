package com.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${allowed.origins:https://yash-portfolio-react-kappa.vercel.app}")
    private String allowedOrigins;

    @Bean
    public CorsFilter corsFilter() {
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

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(originsList);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("*"));
        config.setAllowCredentials(false);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}
