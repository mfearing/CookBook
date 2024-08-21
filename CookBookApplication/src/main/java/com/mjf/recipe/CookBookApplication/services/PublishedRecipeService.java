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

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PublishedRecipeService {

    private PublishedRecipeRepository publishedRecipeRepository;
    private ObjectMapper objectMapper;

    public Optional<PublishedRecipe> findById(Long id){
        return publishedRecipeRepository.findById(id);
    }

    public List<PublishedRecipeDTO> getPublishedRecipeDTOs(){
        List<PublishedRecipe> publishedRecipes = publishedRecipeRepository.findAll();
        return publishedRecipes.stream().map(this::mapPublishedRecipeToDTO).toList();
    }

    public List<PublishedRecipeDTO> getPublishedRecipeDTOsByAuthor(String author){
        List<PublishedRecipe> publishedRecipes = publishedRecipeRepository.findAllByAuthor(author);
        return publishedRecipes.stream().map(this::mapPublishedRecipeToDTO).toList();
    }

    public List<PublishedRecipeDTO> getPublishedRecipeDTOsByNameContaining(String searchTerm){
        List<PublishedRecipe> publishedRecipes = publishedRecipeRepository.findByNameContaining(searchTerm);
        return publishedRecipes.stream().map(this::mapPublishedRecipeToDTO).toList();
    }

     public PublishedRecipeDTO getPublishedRecipeDTOByRecipeId(Long id){
        Optional<PublishedRecipe> publishedRecipe = getPublishedRecipeByRecipeId(id);
         return publishedRecipe.map(this::mapPublishedRecipeToDTO).orElse(null);
     }

    public Optional<PublishedRecipe> getPublishedRecipeByRecipeId(Long id){
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
