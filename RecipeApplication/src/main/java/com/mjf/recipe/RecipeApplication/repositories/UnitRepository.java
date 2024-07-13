package com.mjf.recipe.RecipeApplication.repositories;

import com.mjf.recipe.RecipeApplication.entities.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnitRepository extends JpaRepository<Unit, Long> {
}
