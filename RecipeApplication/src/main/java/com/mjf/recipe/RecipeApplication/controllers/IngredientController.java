package com.mjf.recipe.RecipeApplication.controllers;

import com.mjf.recipe.RecipeApplication.entities.Ingredient;
import com.mjf.recipe.RecipeApplication.services.IngredientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {
    private static final Logger logger = LoggerFactory.getLogger(IngredientController.class);

    @Autowired
    private IngredientService ingredientService;

    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.findAll();
    }

    @GetMapping("/{id}")
    public Ingredient getIngredientById(@PathVariable Long id){
        return ingredientService.findById(id).orElse(null);
    }

    @PostMapping
    public Ingredient createIngredient(@RequestBody Ingredient ingredient){
        return ingredientService.save(ingredient);
    }

    @PostMapping("/bulk")
    public List<Ingredient> createIngredients(@RequestBody List<Ingredient> ingredients){
        return ingredientService.saveAll(ingredients);
    }

    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id){
        ingredientService.deleteById(id);
    }

}
