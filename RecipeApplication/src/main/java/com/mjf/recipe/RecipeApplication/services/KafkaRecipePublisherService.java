package com.mjf.recipe.RecipeApplication.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mjf.recipe.RecipeApplication.config.KafkaConfigProps;
import com.mjf.recipe.RecipeApplication.entities.Recipe;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import lombok.AllArgsConstructor;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class KafkaRecipePublisherService implements RecipePublisherService {

    private static final Logger logger = LoggerFactory.getLogger(KafkaRecipePublisherService.class);

    private final ObjectMapper objectMapper;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final KafkaConfigProps kafkaConfigProps;

    @Override
    public void publish(Recipe recipe) {
        try {
            final String payload = objectMapper.writeValueAsString(recipe);
            kafkaTemplate.send(kafkaConfigProps.getTopic(), payload)
                .thenAccept(result -> { //on successful publish
                    RecordMetadata metadata = result.getRecordMetadata();
                    logger.debug("Message sent successfully to topic {} partition {} with offset {}",
                            metadata.topic(), metadata.partition(), metadata.offset() );
                })
                .exceptionally(ex -> { //on failure to publish
                    logger.error("Message failed to publish: {}", ex.getMessage());
                    return null;
                });
        } catch (final JsonProcessingException ex){
            throw new AppException("Unable to publish recipe: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
