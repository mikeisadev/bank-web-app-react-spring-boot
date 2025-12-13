package com.webapp.bank_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webapp.bank_backend.model.TransactionsModel;

public interface TransactionsRepository extends JpaRepository<TransactionsModel, Long> {}