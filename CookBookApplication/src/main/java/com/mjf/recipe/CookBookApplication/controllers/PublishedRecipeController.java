package com.mjf.recipe.CookBookApplication.controllers;

import com.mjf.recipe.CookBookApplication.dtos.PublishedRecipeDTO;
import com.mjf.recipe.CookBookApplication.services.PublishedRecipeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/published")
public class PublishedRecipeController {

    private PublishedRecipeService publishedRecipeService;

    @GetMapping
    public List<PublishedRecipeDTO> getAllPublishedRecipes(){
        return publishedRecipeService.getPublishedRecipes();
    }

}
