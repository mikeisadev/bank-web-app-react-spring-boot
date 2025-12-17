package com.webapp.bank_backend.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.bank_backend.dto.LoginRequest;
import com.webapp.bank_backend.model.UserModel;
import com.webapp.bank_backend.repository.UserRepository;
import com.webapp.bank_backend.security.JwtService;

/**
 * Questo controller gestirà le chiamate dal FRONTEND:
 * 
 * - login (per accedere da username e password)
 * - register (per registrare un nuovo utente)
 */
@RestController
// @CrossOrigin(origins = {"http://localhost:5173"})
public class AuthController {

    @Autowired
    UserRepository userRepository;

    /**
     * ATTENTO: Posso usare questo PasswordEncoder perché ho definito un Bean
     * dentro SecurityConfig.java
     */
    @Autowired
    PasswordEncoder passwordEncoder;

    /**
     * Riprendo dalla configurazione del bean AuthenticationManager
     */
    @Autowired
    AuthenticationManager authenticationManager;

    /**
     * Ricordiamoci di importare (fare autowired) di JwtService
     */
    @Autowired
    JwtService jwtService;

    @PostMapping("/login") 
    public ResponseEntity<Object> handleUserLogin(@RequestBody LoginRequest loginRequest) {
        // 1. Prendo username e password
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // 2. Verificare che lo username esiste nel database
        if (!userRepository.existsByUsername(username)) {
            return ResponseEntity
                        .status(HttpStatus.UNPROCESSABLE_CONTENT)
                        .body(new HashMap<>() {{
                            put("login_error", "Lo username inserito non esiste");
                        }});
        }

        // 3. Password coincide con quella presente nel database
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );

        // 4. Generare token JWT
        String jwtToken = jwtService.generateToken(username);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new HashMap<>() {{
                    put("message", "Login avvenuto con successo");
                    put("authentication_token", jwtToken);
                }});
    }

    @PostMapping("/register")
    public void handleUserRegistration(@RequestBody UserModel user) {
        // DA FARE: VALIDAZIONE di OGNI SINGOLO CAMPO RICEVUTO DAL FRONTEND

        // Creo l'oggetto UserModel in una variabile
        UserModel newUser = new UserModel();

        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setTaxCode(user.getTaxCode());

        /**
         * ATTENZIONE: Qui devo fare l'hashing della PASSWORD
         */
        newUser.setPassword( passwordEncoder.encode( user.getPassword() ) );

        // Salvo l'utente
        userRepository.save(newUser);
    }

}
