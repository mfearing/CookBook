package com.mjf.recipe.CookBookApplication.repositories;

import com.mjf.recipe.CookBookApplication.entities.PublishedRecipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PublishedRecipeRepository extends JpaRepository<PublishedRecipe, Long> {
    List<PublishedRecipe> findAllByAuthor(String author);
    List<PublishedRecipe> findByNameContaining(String searchTerm);
    PublishedRecipe findByRecipeId(Long id);
}
