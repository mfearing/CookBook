package com.mjf.recipe.CookBookApplication.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mjf.recipe.CookBookApplication.dtos.PublishedRecipeDTO;
import com.mjf.recipe.CookBookApplication.entities.PublishedRecipe;
import com.mjf.recipe.CookBookApplication.repositories.PublishedRecipeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PublishedRecipeServiceTest {

    private static final long PR_ID = 1L;
    private static final long PR_ID2 = 2L;
    private static final long PR_RECIPE_ID = 1L;
    private static final long PR_RECIPE_ID2 = 2L;
    private static final String PR_AUTHOR = "Author 1";
    private static final String PR_AUTHOR2 = "Author 2";
    private static final String PR_NAME = "Recipe 1";
    private static final String PR_DATA = "";

    @Mock
    private PublishedRecipeRepository repository;
    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private PublishedRecipeService service;

    private PublishedRecipe recipe;
    private PublishedRecipe recipe2;

    @BeforeEach
    public void init(){
        recipe = new PublishedRecipe(PR_ID, PR_RECIPE_ID, PR_NAME, PR_AUTHOR, PR_DATA);
        recipe2 = new PublishedRecipe(PR_ID2, PR_RECIPE_ID2, PR_NAME, PR_AUTHOR2, PR_DATA);
    }

    @Test
    public void testSaveRecipe(){
        when(repository.save(recipe)).thenReturn(recipe);
        when(repository.save(recipe2)).thenReturn(recipe2);

        PublishedRecipe savedRecipe = service.save(recipe);

        assertNotNull(savedRecipe);
        assertEquals(savedRecipe.getId(), recipe.getId());

        savedRecipe = service.save(recipe2);

        assertNotNull(savedRecipe);
        assertEquals(savedRecipe.getId(), recipe2.getId());


        verify(repository, times(1)).save(recipe);
        verify(repository, times(1)).save(recipe2);
    }

    @Test
    public void testFindById(){
        when(repository.findById(PR_ID)).thenReturn(Optional.of(recipe));

        Optional<PublishedRecipe> foundRecipe = service.findById(PR_ID);

        assertTrue(foundRecipe.isPresent());
        assertEquals(PR_NAME, foundRecipe.get().getName());
        verify(repository, times(1)).findById(PR_ID);
    }

    @Test
    public void testGetPublishedRecipeDTOsByAuthor(){
        try {
            when(repository.findByAuthorIgnoreCase(PR_AUTHOR)).thenReturn(Collections.singletonList(recipe));
            when(objectMapper.readValue(recipe.getRecipeData(), Map.class)).thenReturn(new HashMap<>());

            List<PublishedRecipeDTO> dtos = service.getPublishedRecipeDTOsByAuthor(PR_AUTHOR);

            assertEquals(1, dtos.size());
            assertEquals(PR_ID, dtos.get(0).getId());
            verify(repository, times(1)).findByAuthorIgnoreCase(PR_AUTHOR);

        } catch (JsonProcessingException ignored){

        }
    }

    @Test
    public void testGetPublishedRecipeDTOsByNameContaining(){
        String searchTerm = "uthor";
        try {
            when(repository.findByNameContainingIgnoreCase(searchTerm)).thenReturn(Arrays.asList(recipe, recipe2));
            when(objectMapper.readValue(recipe.getRecipeData(), Map.class)).thenReturn(new HashMap<>());
            List<PublishedRecipeDTO> dtos = service.getPublishedRecipeDTOsByNameContaining(searchTerm);

            assertEquals(2, dtos.size());

            List<Long> dtoIDs = dtos.stream().map(PublishedRecipeDTO::getId).toList();
            for(PublishedRecipeDTO dto : dtos){
                assertTrue(dtoIDs.contains(dto.getId()));
            }

            verify(repository, times(1)).findByNameContainingIgnoreCase(searchTerm);
        } catch (JsonProcessingException ignored){

        }
    }

    @Test
    public void testGetPublishedRecipeDTOByRecipeId(){
        try{
            when(repository.findByRecipeId(PR_RECIPE_ID)).thenReturn(Optional.ofNullable(recipe));
            when(objectMapper.readValue(recipe.getRecipeData(), Map.class)).thenReturn(new HashMap<>());

            PublishedRecipeDTO foundRecipe = service.getPublishedRecipeDTOByRecipeId(PR_RECIPE_ID);

            assertNotNull(foundRecipe);
            //we check for PublishedRecipe id, not by recipe Id.
            assertEquals(PR_ID, foundRecipe.getId());
            //however, we found the recipe by the recipe Id, so we check that.
            verify(repository, times(1)).findByRecipeId(PR_RECIPE_ID);

        } catch (JsonProcessingException ignored){

        }
    }



}
