package com.mjf.recipe.CookBookApplication.dtos;

import java.util.Map;

public record ClonedPublishedRecipe(String id, String login, Map<String, Object> recipeData){ }
