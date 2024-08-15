package com.mjf.recipe.CookBookApplication.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
@Profile("production")
public class KafkaConfig {

    private static final Logger logger = LoggerFactory.getLogger(KafkaConfig.class);

    @Bean
    public NewTopic recipeClonedTopic(final KafkaConfigProps kafkaConfigProps) {

        logger.info(kafkaConfigProps.getTopic());

        return TopicBuilder.name(kafkaConfigProps.getTopic())
                .partitions(10)
                .replicas(1)
                .build();
    }

}