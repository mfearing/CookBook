package com.mjf.recipe.RecipeApplication.controllers;

import com.mjf.recipe.RecipeApplication.entities.RecipeIngredient;
import com.mjf.recipe.RecipeApplication.services.RecipeIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipe-ingredients")
public class RecipeIngredientController {

    @Autowired
    private RecipeIngredientService recipeIngredientService;

    @GetMapping("/recipe/{recipeId}")
    public List<RecipeIngredient> getRecipeIngredientsByRecipeId(@PathVariable Long recipeId){
        return recipeIngredientService.findByRecipeId(recipeId);
    }

    @PostMapping
    public RecipeIngredient createRecipeIngredient(@RequestBody RecipeIngredient recipeIngredient) {
        return recipeIngredientService.save(recipeIngredient);
    }

    @PostMapping("/bulk")
    public List<RecipeIngredient> createRecipeIngredients(@RequestBody List<RecipeIngredient> recipeIngredients) {
        return recipeIngredientService.saveAll(recipeIngredients);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipeIngredient(@PathVariable Long id) {
        recipeIngredientService.deleteById(id);
    }

    @DeleteMapping("/recipe/{recipeId}")
    public void deleteRecipeIngredientsByRecipeId(@PathVariable Long recipeId) {
        recipeIngredientService.deleteByRecipeId(recipeId);
    }
}
