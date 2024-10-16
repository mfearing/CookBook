package com.mjf.recipe.RecipeApplication.dtos;

import com.mjf.recipe.RecipeApplication.entities.Recipe;

public record ClonedRecipeRequest(String id, String login, Recipe recipeData){}
