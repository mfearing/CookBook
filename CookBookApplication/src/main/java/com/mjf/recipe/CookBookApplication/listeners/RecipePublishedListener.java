package com.mjf.recipe.CookBookApplication.listeners;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mjf.recipe.CookBookApplication.exceptions.AppException;
import com.mjf.recipe.CookBookApplication.model.PublishedRecipe;
import com.mjf.recipe.CookBookApplication.services.PublishedRecipeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
@Profile("production")
@Slf4j
@AllArgsConstructor
public class RecipePublishedListener {

    private static final Logger logger = LoggerFactory.getLogger(RecipePublishedListener.class);

    private final ObjectMapper objectMapper;
    private final PublishedRecipeService publishedRecipeService;

    @KafkaListener(topics = "recipe.published")
    public String listens(String in){
        logger.info(in);
        try{
            Map<String, Object> payload = readJsonAsMap(in);
            Long recipeId = Long.valueOf(payload.get("id").toString());
            String name = payload.get("name").toString();
            String author = payload.get("author").toString();

            Optional<PublishedRecipe> existing = publishedRecipeService.getPublishedRecipeByRecipeId(recipeId);

            if(existing.isEmpty()) {
                //If recipe isn't already published
                PublishedRecipe publishedRecipe = publishedRecipeFromPayload(recipeId, name, author, in);
                publishedRecipeService.save(publishedRecipe);
            } else {
                //If recipe is already published, update properties and save
                PublishedRecipe existingPR = existing.get();
                existingPR.setName(name);
                existingPR.setRecipeData(readJsonAsMap(in));
                publishedRecipeService.save(existingPR);
            }

        } catch (final JsonProcessingException e) {
            logger.info(e.getMessage());
            throw new AppException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return in;
    }

    private Map<String, Object> readJsonAsMap(final String json) throws JsonProcessingException {
        final TypeReference<HashMap<String,Object>> typeRef = new TypeReference<>() {};
        return objectMapper.readValue(json, typeRef);
    }

    private PublishedRecipe publishedRecipeFromPayload(Long recipeId, String name, String author, String in) throws JsonProcessingException {

        return PublishedRecipe.builder()
                .recipeId(recipeId)
                .name(name)
                .author(author)
                .recipeData(readJsonAsMap(in))
                .build();
    }


}
