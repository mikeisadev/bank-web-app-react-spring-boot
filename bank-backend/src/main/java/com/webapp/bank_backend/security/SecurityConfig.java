package com.webapp.bank_backend.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password4j.Argon2Password4jPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Qui dentro vado a configurare Spring Security.
 * 
 * Spring Security mi da:
 * - sistemi di hashing
 * - sistemi di autenticazione
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Dentro questa classe configuro i BEAN.
     * 
     * I bean non sono altro che CONTENITORI di configurazione che hanno effetto
     * su tutto il mio backend spring boot.
     */

    /**
     * Questa parte mi disabilita i CORS.
     * 
     * @param http
     * @return
     */
    @Bean
    public SecurityFilterChain springSecurityFilterChain(HttpSecurity http) {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.disable());
            

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Bean
    // public WebMvcConfigurer corsConfig() {
    //     return new WebMvcConfigurer() {
            
    //         @Override
    //         public void addCorsMappings(CorsRegistry corsRegistry) {

    //             corsRegistry
    //                 .addMapping("/register")
    //                 .allowedOrigins("http://localhost:5173");

    //         }

    //     };
    // }

    // @Bean
    // UrlBasedCorsConfigurationSource corsConfigurationSource() {
    //     CorsConfiguration configuration = new CorsConfiguration();

    //     configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    //     configuration.setAllowedMethods(Arrays.asList("GET","POST"));

    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

    //     source.registerCorsConfiguration("/register", configuration);
    //     return source;
    // }

}
