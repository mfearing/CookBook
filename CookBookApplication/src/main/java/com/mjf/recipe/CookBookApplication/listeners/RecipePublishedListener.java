package com.mjf.recipe.CookBookApplication.listeners;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Profile("production")
@Slf4j
@AllArgsConstructor
public class RecipePublishedListener {

    private static final Logger logger = LoggerFactory.getLogger(RecipePublishedListener.class);

    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "recipe.published")
    public String listens(final String in){
        logger.info(in);

        return in;
    }


}
