package com.mjf.recipe.CookBookApplication.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "published_recipe")
public class PublishedRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "recipe_id", nullable = false)
    private Long recipeId;

    @Column(name = "name", nullable = false)
    @Size(max = 100)
    private String name;

    @Column(name = "author", nullable = false)
    @Size(max = 100)
    private String author;

    @Column(name = "recipe_data", columnDefinition = "TEXT")
    private String recipeData;

}
