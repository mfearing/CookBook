package com.mjf.recipe.CookBookApplication.controllers;

import com.mjf.recipe.CookBookApplication.dtos.ClonedPublishedRecipe;
import com.mjf.recipe.CookBookApplication.dtos.PublishedRecipeResponse;
import com.mjf.recipe.CookBookApplication.exceptions.AppException;
import com.mjf.recipe.CookBookApplication.services.KafkaRecipePublisherService;
import com.mjf.recipe.CookBookApplication.services.PublishedRecipeService;
import com.mjf.recipe.CookBookApplication.utils.CookBookUtils;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Validated
@RequestMapping("/published")
public class PublishedRecipeController {

    private PublishedRecipeService publishedRecipeService;
    private KafkaRecipePublisherService kafkaRecipePublisherService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<PublishedRecipeResponse> getAllPublishedRecipes(){
        return publishedRecipeService.getPublishedRecipes();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PublishedRecipeResponse getPublishedRecipeById(@PathVariable String id){
        return publishedRecipeService.findPublishedRecipeById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePublishedRecipeById(@PathVariable String id){
        if(CookBookUtils.isAuthenticatedUserAdmin()){
            PublishedRecipeResponse publishedRecipeResponse = publishedRecipeService.findPublishedRecipeById(id);
            if(publishedRecipeResponse != null) {
                publishedRecipeService.deleteById(id);
            }
        }
    }

    @GetMapping("/{id}/clone")
    @ResponseStatus(HttpStatus.OK)
    public void clonePublishedRecipe(@PathVariable String id){
        PublishedRecipeResponse recipe = publishedRecipeService.findPublishedRecipeById(id);
        //user must be authenticated to clone recipe into their account
        String author = CookBookUtils.getAuthenticatedUserLogin();
        if(recipe != null && author != null && !author.isEmpty()) {
            kafkaRecipePublisherService.publish(
                    new ClonedPublishedRecipe(
                            recipe.id(),
                            author,
                            recipe.recipeData()
                    )
            );
        } else {
            throw new AppException("Must be authenticated to clone a recipe", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public List<PublishedRecipeResponse> getAllPublishedRecipesBySearchTerm(@RequestParam("searchTerm") @NotBlank String searchTerm){
        return publishedRecipeService.getPublishedRecipeByNameContaining(searchTerm);
    }





}
