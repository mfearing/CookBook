package com.mjf.recipe.RecipeApplication.services;

import com.mjf.recipe.RecipeApplication.entities.Ingredient;
import com.mjf.recipe.RecipeApplication.repositories.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class IngredientService {

    private static final Logger logger = LoggerFactory.getLogger(IngredientService.class);

    @Autowired
    private IngredientRepository ingredientRepository;

    public List<Ingredient> findAll(){
        return ingredientRepository.findAll();
    }

    public Optional<Ingredient> findById(Long id){
        return ingredientRepository.findById(id);
    }

    @Transactional
    public Ingredient save(Ingredient ingredient){
        return ingredientRepository.save(ingredient);
    }

    @Transactional
    public List<Ingredient> saveAll(List<Ingredient> ingredients){
        return ingredientRepository.saveAll(ingredients);
    }

    @Transactional
    public void deleteById(Long id){
        ingredientRepository.deleteById(id);
    }


}
