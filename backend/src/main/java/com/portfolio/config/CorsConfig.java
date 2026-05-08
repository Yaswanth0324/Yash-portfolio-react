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
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        List<String> originsList = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .map(o -> o.replaceAll("^\"|\"$", "")) // strip double quotes
                .map(o -> o.replaceAll("^'|'$", ""))   // strip single quotes
                .map(o -> o.endsWith("/") ? o.substring(0, o.length() - 1) : o)
                .toList();

        config.setAllowedOrigins(originsList);
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"));
        config.setAllowCredentials(false);
        config.setMaxAge(3600L);

        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}
