package com.webapp.bank_backend.model;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;

/**
 * NOTA IMPORTANTE PER SPRING SECURITY.
 * 
 * Spring Security, se lo installi nel tuo progetto Spring Boot, deve prendere
 * il controllo della entity/tabella del database che rapprenta gli utenti.
 * 
 * Quindi UserModel deve implementare UserDetails, un'interfaccia di Spring Security.
 * 
 * Inoltre, il model deve implementare tutti i metodi di User Details
 */
@Entity
@Table(name = "users")
public class UserModel implements UserDetails {

    /**
     * Queste sono tutte le mie colonne del database
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="first_name", nullable = false)
    private String firstName;

    @Column(name="last_name", nullable = false)
    private String lastName;

    @Column(name="username", unique = true, nullable = false)
    private String username;

    @Column(name="email", unique = true, nullable = false)
    private String email;

    @Column(name="tax_code", unique = true, nullable = false)
    private String taxCode;

    @Column(name="password", nullable = false)
    private String password;

    /**
     * Aggiungo la colonna del ruolo dell'utente.
     * 
     * Può essere o "ADMIN" o "USER"
     */
    @Column(name="role", nullable = false)
    private String role = "USER";

    // Creo il costruttore vuoto
    public UserModel() {}

    public UserModel(
        String firstName, 
        String lastName, 
        String username, 
        String email,
        String taxCode,
        String password
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.taxCode = taxCode;
        this.password = password;
    }

    /**
     * Gestione dei ruoli (TASSATIVAMENTE RICHIESTO DA SPRING SECURITY, ALTRIMENTI IL MIO BACKEND NON FUNZIONA)
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));

    }    

    /**
     * Setter & getters
     */
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Aggiungo i setter e i getter della colonna "role"
     */
    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
