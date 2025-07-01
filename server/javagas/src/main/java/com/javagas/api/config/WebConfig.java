package com.javagas.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for setting up CORS mappings.
 * This allows cross-origin requests from specified origins.
 *
 * @version 0.2
 * @since 0.2.1
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configures CORS mappings for the application.
     * <p>
     * This method allows cross-origin requests from specific origins
     * for API endpoints and actuator endpoints.
     * </p>
     *
     * @param registry the registry to add CORS mappings to
     * @since 0.2.1
     */
    @Override
    public void addCorsMappings(
            final CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("*") // Allow Angular app
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Authorization", "Content-Type");
        registry.addMapping("/actuator/**")
                .allowedOrigins("http://localhost:9090") // Allow Prometheus
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
