package com.mjf.recipe.RecipeApplication.dtos;

import com.mjf.recipe.RecipeApplication.enums.Role;

public record UserDTO (String login, Role role){}
