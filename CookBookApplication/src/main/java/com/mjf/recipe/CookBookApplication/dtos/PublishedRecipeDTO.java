package com.mjf.recipe.CookBookApplication.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PublishedRecipeDTO {
    private Long id;
    private Map<String, Object> recipeData;
}
