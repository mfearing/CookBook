package com.mjf.recipe.RecipeApplication.dtos;

import com.mjf.recipe.RecipeApplication.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String login;
    private Role role;
}
