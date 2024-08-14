package com.mjf.recipe.RecipeApplication.services;

import com.mjf.recipe.RecipeApplication.entities.Recipe;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import com.mjf.recipe.RecipeApplication.repositories.RecipeRepository;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public Recipe patchRecipeProperties(Recipe partialRecipe){
        //Patches the recipe properties.  Does not touch the recipe ingredients
        Optional<Recipe> r = recipeRepository.findById(partialRecipe.getId());
        if(r.isPresent()){
            Recipe existingRecipe = r.get();
            if(partialRecipe.getName() != null){
                existingRecipe.setName(partialRecipe.getName());
            }
            if(partialRecipe.getDescription() != null){
                existingRecipe.setDescription(partialRecipe.getDescription());
            }
            if(partialRecipe.getInstructions() != null) {
                existingRecipe.setInstructions(partialRecipe.getInstructions());
            }

            return recipeRepository.save(existingRecipe);
        } else {
            logger.debug("Recipe update failed: recipe not found in database with id {}", partialRecipe.getId());
            throw new AppException("Recipe updated failed: recipe not found in database", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public void deleteById(Long id){
        recipeRepository.deleteById(id);
    }


}
