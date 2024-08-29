package com.mjf.recipe.RecipeApplication.controllers;

import com.mjf.recipe.RecipeApplication.dtos.RecipeSummaryDTO;
import com.mjf.recipe.RecipeApplication.entities.Recipe;
import com.mjf.recipe.RecipeApplication.entities.RecipeIngredient;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import com.mjf.recipe.RecipeApplication.services.KafkaRecipePublisherService;
import com.mjf.recipe.RecipeApplication.services.RecipeIngredientService;
import com.mjf.recipe.RecipeApplication.services.RecipeService;
import com.mjf.recipe.RecipeApplication.utils.RecipeUtils;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/recipe")
public class RecipeController {
    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    private RecipeService recipeService;
    private RecipeIngredientService recipeIngredientService;
    private KafkaRecipePublisherService kafkaRecipePublisherService;

    @GetMapping
    public List<Recipe> getAllRecipes(){
        return recipeService.findByAuthor(RecipeUtils.getAuthenticatedUserLogin());
    }

    @GetMapping("/summary")
    public List<RecipeSummaryDTO> getSummaryRecipes(){
        return recipeService.findByAuthor(RecipeUtils.getAuthenticatedUserLogin())
                .stream()
                .map(recipe -> new RecipeSummaryDTO(recipe.getId(), recipe.getName()))
                .toList();
    }

    //should we have this? maybe it should be tied to user id?
    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id){
        Optional<Recipe> recipe = recipeService.findByIdAndAuthor(id, RecipeUtils.getAuthenticatedUserLogin());
        return recipe.orElse(null);
    }

    @PostMapping
    public Recipe saveRecipe(@RequestBody Recipe recipe){
        //if existing recipe, check author
        if(recipe.getId() != null){
            checkIsAuthor(recipe.getId());
        }
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

    @PostMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe recipe){
        //check recipe being sent is correct id
        if(recipe.getId().equals(id)){
            checkIsAuthor(id);
            return recipeService.save(recipe);
        }
        throw new AppException("Update failed: recipe data did not match path id", HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/{id}")
    public Recipe updateRecipeDetails(@PathVariable Long id, @RequestBody Recipe recipe){
        checkIsAuthor(id);
        return recipeService.patchRecipeProperties(recipe);
    }

    @GetMapping("/{id}/ingredients/{recipeIngredientId}")
    public RecipeIngredient getRecipeIngredient(@PathVariable Long id, @PathVariable Long recipeIngredientId){
        checkIsAuthor(id);
        return recipeIngredientService.findById(recipeIngredientId).orElse(null);
    }

    @GetMapping("/{id}/ingredients")
    public List<RecipeIngredient> getRecipeIngredients(@PathVariable Long id){
        checkIsAuthor(id);
        return recipeIngredientService.findByRecipeId(id);
    }

    @PostMapping("/{id}/ingredients")
    public List<RecipeIngredient> saveRecipeIngredients(@PathVariable Long id, @RequestBody List<RecipeIngredient> recipeIngredients){
        checkIsAuthor(id);
        return recipeIngredientService.saveAll(recipeIngredients);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id){
        checkIsAuthor(id);
        recipeService.deleteById(id);
    }

    //Delete single recipe ingredients
    @DeleteMapping("/{id}/ingredients/{recipeIngredientId}")
    public void deleteRecipeIngredient(@PathVariable Long id, @PathVariable Long recipeIngredientId){
        checkIsAuthor(id);
        recipeIngredientService.deleteById(recipeIngredientId);
    }

    //Delete all recipe ingredients
    @DeleteMapping("/{id}/ingredients")
    public void deleteRecipeIngredients(@PathVariable Long id){
        checkIsAuthor(id);
        recipeIngredientService.deleteAllByRecipeId(id);
    }

    @GetMapping("/{id}/publish")
    public void publishRecipe(@PathVariable Long id){
        Optional<Recipe> recipe = recipeService.findByIdAndAuthor(id, RecipeUtils.getAuthenticatedUserLogin());
        //cannot publish a recipe of a different author
        if(recipe.isPresent()){
            kafkaRecipePublisherService.publish(recipe.get());
        } else {
            throw new AppException("Recipe failed to publish: recipe not found", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkIsAuthor(Long id){
        Optional<Recipe> recipe = recipeService.findByIdAndAuthor(id, RecipeUtils.getAuthenticatedUserLogin());
        if(recipe.isEmpty()){
            throw new AppException("Recipe doesn't exist or does not belong to this author", HttpStatus.BAD_REQUEST);
        }
    }

}
