package com.mjf.recipe.RecipeApplication.services;

import com.mjf.recipe.RecipeApplication.entities.Ingredient;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import com.mjf.recipe.RecipeApplication.repositories.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
        if(ingredientRepository.findByName(ingredient.getName()).isPresent()){
            throw new AppException("Ingredient " + ingredient.getName() + " already exists.", HttpStatus.BAD_REQUEST);
        }
        return ingredientRepository.save(ingredient);
    }

    @Transactional
    public List<Ingredient> saveAll(List<Ingredient> ingredients){
        List<String> namesToCreate = ingredients.stream().map(Ingredient::getName).toList();
        List<Ingredient> existingIngredients = ingredientRepository.findAllByNameIn(namesToCreate);
        Set<String> existingIngredientNames = existingIngredients.stream()
                .map(Ingredient::getName).collect(Collectors.toSet());
        List<Ingredient> filteredIngredientsToCreate = ingredients.stream().filter(
                ingredient -> !existingIngredientNames.contains(ingredient.getName())
                ).toList();
        return ingredientRepository.saveAll(filteredIngredientsToCreate);
    }

    @Transactional
    public void deleteById(Long id){
        ingredientRepository.deleteById(id);
    }


}
