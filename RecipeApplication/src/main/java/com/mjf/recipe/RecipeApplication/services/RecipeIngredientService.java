package com.mjf.recipe.RecipeApplication.services;

import com.mjf.recipe.RecipeApplication.entities.RecipeIngredient;
import com.mjf.recipe.RecipeApplication.repositories.RecipeIngredientRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class RecipeIngredientService {
    private final Logger logger = LoggerFactory.getLogger(RecipeIngredientService.class);

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;

    //This should never be used, as you should only be getting ingredients by recipe Id
    public List<RecipeIngredient> findByRecipeId(Long recipeId){
        return recipeIngredientRepository.findByRecipeId(recipeId);
    }

    public Optional<RecipeIngredient> findById(Long id){
        return recipeIngredientRepository.findById(id);
    }

    @Transactional
    public RecipeIngredient save(RecipeIngredient recipeIngredient){
        return recipeIngredientRepository.save(recipeIngredient);
    }

    @Transactional
    public List<RecipeIngredient> saveAll(List<RecipeIngredient> recipeIngredients){
        return recipeIngredientRepository.saveAll(recipeIngredients);
    }

    @Transactional
    public void deleteById(Long id){
        recipeIngredientRepository.deleteById(id);
    }

    @Transactional
    public void deleteAllByRecipeId(Long id){
        recipeIngredientRepository.deleteByRecipeId(id);
    }



}
