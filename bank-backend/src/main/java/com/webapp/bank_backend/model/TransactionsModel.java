package com.webapp.bank_backend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name="transactions")
public class TransactionsModel {

    /**
     * APPUNTI
     * 
     * Tabella: movimenti (transactions)
     * 
     * - id
     * - tipo_transazione (transaction type) = entrata / uscita
     * - valore (value)
     * - categoria transazione (transaction category)
     * - data inserimento (creation_date)
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="transaction_type")
    private String transactionType;

    @Column(name="value")
    private Float value;

    @Column(name="transaction_category")
    private String transactionCategory;

    @CreationTimestamp
    @Column(name="creation_date")
    private LocalDateTime creationDate;

    public TransactionsModel() {}

    public TransactionsModel(String transactionType, Float value, String transactionCategory) {
        this.transactionType = transactionType;
        this.value = value;
        this.transactionCategory = transactionCategory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public String getTransactionCategory() {
        return transactionCategory;
    }

    public void setTransactionCategory(String transactionCategory) {
        this.transactionCategory = transactionCategory;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

}
