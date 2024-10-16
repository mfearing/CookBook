package com.mjf.recipe.CookBookApplication.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(value = "publishedRecipe")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PublishedRecipe {

    @Id
    private String id;
    private Long recipeId;
    private String name;
    private String author;
    private Map<String, Object> recipeData;

}
