package com.mjf.recipe.CookBookApplication.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mjf.recipe.CookBookApplication.dtos.PublishedRecipeDTO;
import com.mjf.recipe.CookBookApplication.entities.PublishedRecipe;
import com.mjf.recipe.CookBookApplication.exceptions.AppException;
import com.mjf.recipe.CookBookApplication.repositories.PublishedRecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class PublishedRecipeService {

    private PublishedRecipeRepository publishedRecipeRepository;
    private ObjectMapper objectMapper;

    public List<PublishedRecipeDTO> getPublishedRecipes(){
        List<PublishedRecipe> publishedRecipes = publishedRecipeRepository.findAll();
        return publishedRecipes.stream().map(this::mapPublishedRecipeToDTO).toList();
    }

    public List<PublishedRecipe> getPublishedRecipesByAuthor(String author){
        return publishedRecipeRepository.findAllByAuthor(author);
    }

    public List<PublishedRecipe> getPublishedRecipesByNameContaining(String searchTerm){
        return publishedRecipeRepository.findByNameContaining(searchTerm);
    }

    public PublishedRecipe getPublishedRecipeByRecipeId(Long id){
        return publishedRecipeRepository.findByRecipeId(id);
    }

    @Transactional
    public PublishedRecipe save(PublishedRecipe publishedRecipe){
        return publishedRecipeRepository.save(publishedRecipe);
    }

    private PublishedRecipeDTO mapPublishedRecipeToDTO(PublishedRecipe publishedRecipe) {
        try {
            Map<String, Object> recipeObject = objectMapper.readValue(publishedRecipe.getRecipeData(), Map.class);
            return PublishedRecipeDTO.builder()
                    .id(publishedRecipe.getId())
                    .recipeData(recipeObject)
                    .build();
        } catch (JsonProcessingException e){
            throw new AppException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
