package com.mjf.recipe.RecipeApplication.repositories;

import com.mjf.recipe.RecipeApplication.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    Optional<Recipe> findById(Long id);
    List<Recipe> findByAuthor(String author);
}
