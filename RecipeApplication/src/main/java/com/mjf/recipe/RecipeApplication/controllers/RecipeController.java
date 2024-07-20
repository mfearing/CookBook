package com.mjf.recipe.RecipeApplication.controllers;

import com.mjf.recipe.RecipeApplication.entities.Recipe;
import com.mjf.recipe.RecipeApplication.entities.RecipeIngredient;
import com.mjf.recipe.RecipeApplication.services.RecipeIngredientService;
import com.mjf.recipe.RecipeApplication.services.RecipeService;
import com.mjf.recipe.RecipeApplication.utils.RecipeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @Autowired
    private RecipeService recipeService;

    @Autowired
    RecipeIngredientService recipeIngredientService;

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
    public Recipe saveRecipe(@RequestBody Recipe recipe){
        //Recipe may be new and not have an id, separate recipe from ingredients and save recipe to get an id
        List<RecipeIngredient> ingredients = recipe.getRecipeIngredients();
        recipe.setRecipeIngredients(new ArrayList<>());
        Recipe finalRecipe = recipeService.save(recipe);

        //after saving, get id and add to each ingredient, then save ingredients and put onto final recipe
        ingredients.forEach(ingredient -> ingredient.setRecipeId(finalRecipe.getId()));
        finalRecipe.setRecipeIngredients(recipeIngredientService.saveAll(ingredients));

        //return final recipe
        return finalRecipe;
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id){
        recipeService.deleteById(id);
    }

    //Delete single recipe ingredients
    @DeleteMapping("/{id}/ingredients/{recipeIngredientId}")
    public void deleteRecipeIngredient(@PathVariable Long id, @PathVariable Long recipeIngredientId){
        recipeIngredientService.deleteById(recipeIngredientId);
    }

    //Delete all recipe ingredients
    @DeleteMapping("/{id}/ingredients")
    public void deleteRecipeIngredients(@PathVariable Long id){
        recipeIngredientService.deleteAllByRecipeId(id);
    }

}
