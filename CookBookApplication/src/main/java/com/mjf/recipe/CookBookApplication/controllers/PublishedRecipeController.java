package com.mjf.recipe.CookBookApplication.controllers;

import com.mjf.recipe.CookBookApplication.dtos.PublishedRecipeDTO;
import com.mjf.recipe.CookBookApplication.services.PublishedRecipeService;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Validated
@RequestMapping("/published")
public class PublishedRecipeController {

    private PublishedRecipeService publishedRecipeService;

    @GetMapping
    public List<PublishedRecipeDTO> getAllPublishedRecipes(){
        return publishedRecipeService.getPublishedRecipeDTOs();
    }

    @GetMapping("/{id}")
    public PublishedRecipeDTO getPublishedRecipeById(@PathVariable long id){
        return publishedRecipeService.findPublishedRecipeDTOById(id);
    }

    @GetMapping("/search")
    public List<PublishedRecipeDTO> getAllPublishedRecipes(@RequestParam("searchTerm") @NotBlank String searchTerm){
        return publishedRecipeService.getPublishedRecipeDTOsByNameContaining(searchTerm);
    }



}
