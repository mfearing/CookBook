package com.mjf.recipe.CookBookApplication.repositories;

import com.mjf.recipe.CookBookApplication.model.PublishedRecipe;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PublishedRecipeRepository extends MongoRepository<PublishedRecipe, String> {
    Optional<PublishedRecipe> findByRecipeId(Long id);
    Optional<PublishedRecipe> findByIdAndAuthor(String id, String author);
    List<PublishedRecipe> findByAuthorIgnoreCase(String author);
    List<PublishedRecipe> findByNameContainingIgnoreCase(String searchTerm);

}
