package com.webapp.bank_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webapp.bank_backend.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {

}
