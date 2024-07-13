package com.mjf.recipe.RecipeApplication.services;

import com.mjf.recipe.RecipeApplication.entities.Recipe;
import com.mjf.recipe.RecipeApplication.repositories.RecipeRepository;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@NoArgsConstructor
@Service
public class RecipeService {

    private final Logger logger = LoggerFactory.getLogger(RecipeService.class);

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> findAll(){
        return recipeRepository.findAll();
    }

    public Optional<Recipe> findById(Long id){
        return recipeRepository.findById(id);
    }

    public List<Recipe> findByAuthor(String author){
        return recipeRepository.findByAuthor(author);
    }

    @Transactional
    public Recipe save(Recipe recipe){
        return recipeRepository.save(recipe);
    }

    @Transactional
    public void deleteById(Long id){
        recipeRepository.deleteById(id);
    }


}
