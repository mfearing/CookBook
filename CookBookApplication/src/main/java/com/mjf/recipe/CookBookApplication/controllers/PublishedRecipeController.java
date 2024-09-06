package com.mjf.recipe.CookBookApplication.controllers;

import com.mjf.recipe.CookBookApplication.dtos.ClonedPublishedRecipeDTO;
import com.mjf.recipe.CookBookApplication.dtos.PublishedRecipeDTO;
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
    public List<PublishedRecipeDTO> getAllPublishedRecipes(){
        return publishedRecipeService.getPublishedRecipeDTOs();
    }

    @GetMapping("/{id}")
    public PublishedRecipeDTO getPublishedRecipeById(@PathVariable long id){
        return publishedRecipeService.findPublishedRecipeDTOById(id);
    }

    @GetMapping("/{id}/clone")
    public void clonePublishedRecipe(@PathVariable long id){
        PublishedRecipeDTO recipe = publishedRecipeService.findPublishedRecipeDTOById(id);
        //user must be authenticated to clone recipe into their account
        String author = CookBookUtils.getAuthenticatedUserLogin();
        if(recipe != null && author != null && !author.isEmpty()) {
            kafkaRecipePublisherService.publish(
                ClonedPublishedRecipeDTO.builder()
                    .id(recipe.getId())
                    .login(author)
                    .recipeData(recipe.getRecipeData())
                    .build()
            );
        } else {
            throw new AppException("Must be authenticated to clone a recipe", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search")
    public List<PublishedRecipeDTO> getAllPublishedRecipes(@RequestParam("searchTerm") @NotBlank String searchTerm){
        return publishedRecipeService.getPublishedRecipeDTOsByNameContaining(searchTerm);
    }





}
