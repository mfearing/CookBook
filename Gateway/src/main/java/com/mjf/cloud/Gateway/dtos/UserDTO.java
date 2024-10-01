package com.mjf.cloud.Gateway.dtos;

import com.mjf.cloud.Gateway.enums.Role;
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
