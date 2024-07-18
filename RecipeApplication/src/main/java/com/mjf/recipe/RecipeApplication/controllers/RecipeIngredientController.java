package com.mjf.recipe.RecipeApplication.controllers;

import com.mjf.recipe.RecipeApplication.entities.Recipe;
import com.mjf.recipe.RecipeApplication.entities.RecipeIngredient;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import com.mjf.recipe.RecipeApplication.services.RecipeIngredientService;
import com.mjf.recipe.RecipeApplication.services.RecipeService;
import com.mjf.recipe.RecipeApplication.utils.RecipeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
    Question: Can any user add an ingredient to a recipe that they do not own?
 */
@RestController
@RequestMapping("/recipe-ingredients")
public class RecipeIngredientController {

    @Autowired
    private RecipeIngredientService recipeIngredientService;
    @Autowired
    RecipeService recipeService;

    @GetMapping("/recipe/{recipeId}")
    public List<RecipeIngredient> getRecipeIngredientsByRecipeId(@PathVariable Long recipeId){
        return recipeIngredientService.findByRecipeId(recipeId);
    }

    @PostMapping
    public RecipeIngredient createRecipeIngredient(@RequestBody RecipeIngredient recipeIngredient) {
        Recipe recipe = recipeService.findById(recipeIngredient.getRecipeId()).orElse(null);
        if(recipe != null && recipe.getAuthor().equals(RecipeUtils.getAuthenticatedUserLogin())) {
            return recipeIngredientService.save(recipeIngredient);
        } else {
            throw new AppException("Cannot save ingredient to a Recipe owned by another author.", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/bulk")
    public List<RecipeIngredient> createRecipeIngredients(@RequestBody List<RecipeIngredient> recipeIngredients) {
        Recipe recipe = recipeService.findById(recipeIngredients.get(0).getRecipeId()).orElse(null);
        if(recipe != null && recipe.getAuthor().equals(RecipeUtils.getAuthenticatedUserLogin())) {
            return recipeIngredientService.saveAll(recipeIngredients);
        } else {
            throw new AppException("Cannot save ingredients to a Recipe owned by another author.", HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteRecipeIngredient(@PathVariable Long id) {
        RecipeIngredient ri = recipeIngredientService.findById(id).orElse(null);
        if(ri != null){
            Recipe recipe = recipeService.findById(ri.getRecipeId()).orElse(null);
            if(recipe != null && recipe.getAuthor().equals(RecipeUtils.getAuthenticatedUserLogin())){
                recipeIngredientService.deleteById(id);
            } else {
                throw new AppException("Cannot delete ingredients from a Recipe owned by another author.", HttpStatus.UNAUTHORIZED);
            }
        }
    }

    @DeleteMapping("/recipe/{recipeId}")
    public void deleteRecipeIngredientsByRecipeId(@PathVariable Long recipeId) {
        RecipeIngredient ri = recipeIngredientService.findByRecipeId(recipeId).get(0);
        if(ri != null) {
            Recipe recipe = recipeService.findById(ri.getRecipeId()).orElse(null);
            if (recipe != null && recipe.getAuthor().equals(RecipeUtils.getAuthenticatedUserLogin())) {
                recipeIngredientService.deleteByRecipeId(recipeId);
            } else {
                throw new AppException("Cannot delete ingredients from a Recipe owned by another author.", HttpStatus.UNAUTHORIZED);
            }
        }
    }
}
