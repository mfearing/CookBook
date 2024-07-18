package com.mjf.recipe.RecipeApplication.repositories;

import com.mjf.recipe.RecipeApplication.entities.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UnitRepository extends JpaRepository<Unit, Long> {
    Optional<Unit> findByName(String name);
    List<Unit> findAllByNameIn(List<String> name);
}
