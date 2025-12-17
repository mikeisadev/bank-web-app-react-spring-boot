package com.webapp.bank_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.bank_backend.model.TransactionsModel;
import com.webapp.bank_backend.repository.TransactionsRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.ResponseEntity;

/**
 * ATTENZIONE! APPUNTO IMPORTANTE!
 * 
 * L'annotazione RestController è FONDAMENTALE.
 * 
 * A ogni RETURN, il valore viene convertito in stringa JSON.
 */

@RestController
// @CrossOrigin(origins = {"http://localhost:5173"})
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
    public ResponseEntity<Object> addSingleMovement(@RequestBody TransactionsModel transaction) {  
        Map<String, String> errors = new HashMap<>();

        // TODO: QUESTO ARRICCHIMENTO LO FACCIAMO DOPO
        // {
        //     "status": "error",
        //     "message": "Si è verificato un errore durante l'inserimento di un movimento",
        //     "errors": [
        //         "value": "messaggio di errore",
        //         "transaction_category": "messaggio di errore"
        //     ]
        // }

        // {
        //     "status": "success",
        //     "message": "Movimento inserito con successo",
        //     "data": []
        // }

        if (transaction.getValue() == 0) {
            errors.put("value_error", "Non hai inserito il valore");

            return ResponseEntity
                        .status(HttpStatus.UNPROCESSABLE_CONTENT)
                        .body(errors);
        }  

        if (transaction.getTransactionCategory() == null) {
            errors.put("transaction_category_error", "Non hai messo la categoria del movimento");
            
            return ResponseEntity
                        .status(HttpStatus.UNPROCESSABLE_CONTENT)
                        .body(errors);
        }

        transactionsRepository.save(transaction);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new HashMap<>() {{
                    put("message", "Movimento inserito con successo");
                    put("chiave", "valore");
                    put("ciao", "dal backend");
                }});
    }    
}
