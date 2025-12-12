package com.webapp.bank_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.bank_backend.model.EntrateModel;
import com.webapp.bank_backend.repository.EntrateRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EntrateController {

    @Autowired
    private EntrateRepository entrateRepository;

    @GetMapping("/entrate")
    public List<EntrateModel> ottieniEntrate() {
        return entrateRepository.findAll();
    }
    
}
