package com.webapp.bank_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.bank_backend.model.TransactionsModel;
import com.webapp.bank_backend.repository.TransactionsRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionsController {

    @Autowired
    private TransactionsRepository transactionsRepository;

    @GetMapping("/transactions")
    public List<TransactionsModel> getMovements() {
        return transactionsRepository.findAll();
    }

    @PostMapping("/transactions")
    public void addSingleMovement(@RequestBody TransactionsModel pasta) {
        transactionsRepository.save(pasta);
    }    
}
