package com.webapp.bank_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.bank_backend.model.TransactionsModel;
import com.webapp.bank_backend.repository.TransactionsRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
public class TransactionsController {

    @Autowired
    private TransactionsRepository transactionsRepository;

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionsModel>> getMovements() {        
        return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(transactionsRepository.findAll());
    }

    @PostMapping("/transactions")
    public ResponseEntity addSingleMovement(@RequestBody TransactionsModel transaction) {
        Map<String, String> errors = new HashMap<>();
        
        if (transaction.getValue() == 0) {
            errors.put("value_error", "Non hai inserito il valore! Inseriscine uno.");
        }

        if (transaction.getTransactionCategory() == null) {
           errors.put("transaction_category_error", "Non hai inserito la categoria del tuo movimento! Seleziona il tipo di movimento");
        }

        if (errors.size() > 0) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_CONTENT)
                    .body(errors);
        }

        transactionsRepository.save(transaction);

        return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Movimento inserito con successo");
    }    
}
