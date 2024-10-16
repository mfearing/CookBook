package com.mjf.recipe.CookBookApplication.services;

import com.mjf.recipe.CookBookApplication.dtos.PublishedRecipeResponse;
import com.mjf.recipe.CookBookApplication.model.PublishedRecipe;
import com.mjf.recipe.CookBookApplication.repositories.PublishedRecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PublishedRecipeService {

    private PublishedRecipeRepository publishedRecipeRepository;

    public void deleteById(String id){
        publishedRecipeRepository.deleteById(id);
    }

    public PublishedRecipeResponse findPublishedRecipeById(String id){
        Optional<PublishedRecipe> recipe = publishedRecipeRepository.findById(id);
        return recipe.map(this::mapPublishedRecipeToResponse).orElse(null);
    }

    public List<PublishedRecipeResponse> getPublishedRecipes(){
        List<PublishedRecipe> publishedRecipes = publishedRecipeRepository.findAll();
        return publishedRecipes.stream().map(this::mapPublishedRecipeToResponse).toList();
    }

    public List<PublishedRecipeResponse> getPublishedRecipeByNameContaining(String searchTerm){
        List<PublishedRecipe> publishedRecipes = publishedRecipeRepository.findByNameContainingIgnoreCase(searchTerm);
        return publishedRecipes.stream().map(this::mapPublishedRecipeToResponse).toList();
    }

    public Optional<PublishedRecipe> getPublishedRecipeByRecipeId(Long id){
        return publishedRecipeRepository.findByRecipeId(id);
    }

    @Transactional
    public PublishedRecipe save(PublishedRecipe publishedRecipe){
        return publishedRecipeRepository.save(publishedRecipe);
    }

    private PublishedRecipeResponse mapPublishedRecipeToResponse(PublishedRecipe publishedRecipe) {
        Map<String, Object> recipeObject = publishedRecipe.getRecipeData();
        return new PublishedRecipeResponse(
                publishedRecipe.getId(),
                publishedRecipe.getRecipeData()
        );
    }

}
