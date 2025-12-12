package com.webapp.bank_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="entrate")
public class EntrateModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valore")
    private Float valore;

    public EntrateModel() {}

    public EntrateModel(Float valore) {
        this.valore = valore;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getValore() {
        return this.valore;
    }

    public void setValore(Float valore) {
        this.valore = valore;
    }

}
