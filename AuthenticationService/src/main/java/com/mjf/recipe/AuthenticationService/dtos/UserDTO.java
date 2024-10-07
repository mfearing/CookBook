package com.mjf.recipe.AuthenticationService.dtos;

import com.mjf.recipe.AuthenticationService.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String login;
    private Map<String, Object> preferences;
    private String token;
    private Date createdAt;
    private Date updatedAt;
    private Role role;
}
