package com.mjf.recipe.AuthenticationService.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN,
    USER;

    @Override
    public String getAuthority(){
        return this.name();
    }
}
