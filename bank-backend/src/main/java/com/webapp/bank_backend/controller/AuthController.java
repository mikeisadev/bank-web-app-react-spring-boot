package com.webapp.bank_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.bank_backend.model.UserModel;
import com.webapp.bank_backend.repository.UserRepository;

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
