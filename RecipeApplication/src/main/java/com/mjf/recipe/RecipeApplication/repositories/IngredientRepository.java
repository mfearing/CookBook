package com.mjf.recipe.RecipeApplication.repositories;

import com.mjf.recipe.RecipeApplication.entities.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
