package com.mjf.recipe.RecipeApplication.controllers;

import com.mjf.recipe.RecipeApplication.entities.Recipe;
import com.mjf.recipe.RecipeApplication.services.RecipeService;
import com.mjf.recipe.RecipeApplication.utils.RecipeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public List<Recipe> getAllRecipes(){
        return recipeService.findByAuthor(RecipeUtils.getAuthenticatedUserLogin());
    }

    //should we have this? maybe it should be tied to user id?
    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id){
        Optional<Recipe> recipe = recipeService.findById(id);
        return (recipe.isPresent() && recipe.get().getAuthor().equals(RecipeUtils.getAuthenticatedUserLogin())) ? recipe.get() : null;
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe){
        return recipeService.save(recipe);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id){
        recipeService.deleteById(id);
    }


}
