package com.mjf.recipe.CookBookApplication.services;

import com.mjf.recipe.CookBookApplication.dtos.ClonedPublishedRecipeDTO;

public interface PublishedRecipeCloneService {

    void publish(ClonedPublishedRecipeDTO publishedRecipeDto);

}
