package com.mjf.recipe.CookBookApplication.services;

import com.mjf.recipe.CookBookApplication.dtos.ClonedPublishedRecipe;

public interface PublishedRecipeCloneService {

    void publish(ClonedPublishedRecipe publishedRecipeDto);

}
