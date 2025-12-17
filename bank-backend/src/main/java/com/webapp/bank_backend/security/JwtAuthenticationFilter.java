package com.webapp.bank_backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Estrae l'header Authorization
        final String authHeader = request.getHeader("Authorization");

        // Se non c'è l'header o non inizia con "Bearer ", passa al filtro successivo
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Estrae il token (rimuove "Bearer " dall'inizio)
        final String jwt = authHeader.substring(7);

        // Estrae l'email dal token
        final String userEmail = jwtService.extractEmail(jwt);

        // Se c'è un'email e l'utente non è già autenticato
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Carica i dettagli dell'utente dal database
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            // Verifica che il token sia valido
            if (jwtService.isTokenValid(jwt, userDetails.getUsername())) {

                // Crea un'autenticazione
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Imposta l'autenticazione nel contesto di Spring Security
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Passa al filtro successivo
        filterChain.doFilter(request, response);
    }
}
