package com.mjf.recipe.RecipeApplication.controllers;

import com.mjf.recipe.RecipeApplication.dtos.IngredientRequest;
import com.mjf.recipe.RecipeApplication.dtos.IngredientResponse;
import com.mjf.recipe.RecipeApplication.services.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<IngredientResponse> getAllIngredients() {
        return ingredientService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public IngredientResponse getIngredientById(@PathVariable Long id){
        return ingredientService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public IngredientResponse createIngredient(@RequestBody IngredientRequest ingredient){
        return ingredientService.save(ingredient);
    }

    @PostMapping("/bulk")
    public List<IngredientResponse> createIngredients(@RequestBody List<IngredientRequest> ingredients){
        return ingredientService.saveAll(ingredients);
    }

    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id){
        ingredientService.deleteById(id);
    }

}
