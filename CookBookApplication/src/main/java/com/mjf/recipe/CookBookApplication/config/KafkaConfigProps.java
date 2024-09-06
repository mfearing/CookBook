package com.mjf.recipe.CookBookApplication.config;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "devitro.kafka.clone")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KafkaConfigProps {

    private String topic;

}