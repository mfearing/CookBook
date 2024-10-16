package com.mjf.recipe.RecipeApplication.dtos;

import com.mjf.recipe.RecipeApplication.entities.Recipe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClonedRecipeDTO {
    private String id;
    private String login;
    private Recipe recipeData;
}
