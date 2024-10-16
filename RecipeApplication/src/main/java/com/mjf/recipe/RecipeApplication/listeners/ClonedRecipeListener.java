package com.mjf.recipe.RecipeApplication.listeners;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mjf.recipe.RecipeApplication.dtos.ClonedRecipeDTO;
import com.mjf.recipe.RecipeApplication.entities.Recipe;
import com.mjf.recipe.RecipeApplication.entities.RecipeIngredient;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import com.mjf.recipe.RecipeApplication.services.RecipeIngredientService;
import com.mjf.recipe.RecipeApplication.services.RecipeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Profile("production")
@Slf4j
@AllArgsConstructor
public class ClonedRecipeListener {

    private static final Logger logger = LoggerFactory.getLogger(ClonedRecipeListener.class);

    private final ObjectMapper objectMapper;
    private final RecipeService recipeService;
    private final RecipeIngredientService recipeIngredientService;

    @KafkaListener(topics = "recipe.clone")
    public String listens(String in){
        logger.info(in);
        try{

            ClonedRecipeDTO clone = objectMapper.readValue(in, ClonedRecipeDTO.class);
            Recipe clonedRecipe = Recipe.builder()
                    .name("Cloned " + clone.recipeData().getName())
                    .instructions(clone.recipeData().getInstructions())
                    .description(clone.recipeData().getDescription())
                    .author(clone.login()) //NOT FROM THE RECIPE DATA!!! that's the old author
                    .build();

            //cannot save recipe ingredients without getting the new recipe id, so we save that first
            Recipe newRecipe = recipeService.save(clonedRecipe);

            //TODO: Bug here if the ingredient or unit no longer exists in the database!
            recipeIngredientService.saveAll(
                pruneRecipeIngredientIDs(clone.recipeData().getRecipeIngredients(), newRecipe.getId())
            );

        } catch (final JsonProcessingException e) {
            logger.info(e.getMessage());
            throw new AppException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return in;
    }

    private List<RecipeIngredient> pruneRecipeIngredientIDs(List<RecipeIngredient> recipeIngredients, Long newId){
        return recipeIngredients.stream().map(recipeIngredient ->
            RecipeIngredient.builder()
                .recipeId(newId)
                .ingredient(recipeIngredient.getIngredient())
                .unit(recipeIngredient.getUnit())
                .quantity(recipeIngredient.getQuantity())
            .build()
        ).toList();
    }

}
