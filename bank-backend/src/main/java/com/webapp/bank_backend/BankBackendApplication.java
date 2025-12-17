package com.webapp.bank_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BankBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankBackendApplication.class, args);
	}

	// TODO: Aggiungere Cross Origin per evitare di farlo su ogni controller

	// TODO: Aggiungere un rate limiter: per evitare troppe richieste da ogni utente

}
