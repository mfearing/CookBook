package com.mjf.recipe.CookBookApplication.repositories;

import com.mjf.recipe.CookBookApplication.entities.PublishedRecipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PublishedRecipeRepository extends JpaRepository<PublishedRecipe, Long> {
    List<PublishedRecipe> findByAuthorIgnoreCase(String author);
    List<PublishedRecipe> findByNameContainingIgnoreCase(String searchTerm);
    Optional<PublishedRecipe> findByRecipeId(Long id);
    Optional<PublishedRecipe> findByIdAndAuthor(Long id, String author);
}
