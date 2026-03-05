package br.com.fiap.superheroes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class SuperheroesApplication {

	record HealthStatus(String status, String message){}

	public static void main(String[] args) {
		SpringApplication.run(SuperheroesApplication.class, args);
	}

	@GetMapping("/")
	public HealthStatus healthCheck(){
		return new HealthStatus("OK","Ta funcionando");
	}
}
