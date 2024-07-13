package com.mjf.recipe.RecipeApplication.controllers;

import com.mjf.recipe.RecipeApplication.dtos.UserDTO;
import com.mjf.recipe.RecipeApplication.entities.Recipe;
import com.mjf.recipe.RecipeApplication.services.RecipeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public List<Recipe> getAllRecipes(){
        return recipeService.findByAuthor(getAuthenticatedUserLogin());
    }

    //should we have this? maybe it should be tied to user id?
    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id){
        Optional<Recipe> recipe = recipeService.findById(id);
        return (recipe.isPresent() && recipe.get().getAuthor().equals(getAuthenticatedUserLogin())) ? recipe.get() : null;
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe){
        return recipeService.save(recipe);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id){
        recipeService.deleteById(id);
    }

    private static String getAuthenticatedUserLogin(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDTO){
            return ((UserDTO) principal).getLogin();
        }
        return null;
    }

}
