package br.com.fiap.superheroes.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Superhero {
    private Long id;
    private String name;
    private String superPower;
    private int level;
    private Boolean isAlive;
}
