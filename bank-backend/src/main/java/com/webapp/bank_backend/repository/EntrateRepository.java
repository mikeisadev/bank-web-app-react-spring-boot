package com.webapp.bank_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webapp.bank_backend.model.EntrateModel;

public interface EntrateRepository extends JpaRepository<EntrateModel, Long> {}