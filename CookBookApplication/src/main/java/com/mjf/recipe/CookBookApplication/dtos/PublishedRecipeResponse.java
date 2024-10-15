package com.mjf.recipe.CookBookApplication.dtos;

import java.util.Map;

public record PublishedRecipeResponse(String id, Map<String, Object> recipeData) {
}
