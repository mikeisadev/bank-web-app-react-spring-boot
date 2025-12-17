package com.webapp.bank_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
@CrossOrigin(origins = {"http://localhost:5173"})
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    public void handleUserRegistration(@RequestBody UserModel user) {
        // DA FARE: VALIDAZIONE di OGNI SINGOLO CAMPO RICEVUTO DAL FRONTEND

        // Salvo l'utente
        userRepository.save(user);
    }

}
