package br.com.fiap.superheroes.services;

import br.com.fiap.superheroes.models.Superhero;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class SuperheroService {
    private List<Superhero> repository = new ArrayList<>();

    public  List<Superhero> getAllHeroes(){
        return repository;
    }

    public Superhero addHero(Superhero superhero){
        superhero.setId(Math.abs( new Random().nextLong()));
        repository.add(superhero);
        return superhero;
    }

    public Optional<Superhero> getHeroById(Long id){
        return repository.stream()
                .filter(superhero -> superhero.getId().equals(id))
                .findFirst();
    }

}
