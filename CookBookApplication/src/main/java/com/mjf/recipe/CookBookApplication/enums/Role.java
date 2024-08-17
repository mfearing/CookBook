package com.mjf.recipe.CookBookApplication.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN,
    USER;

    @Override
    public String getAuthority(){
        return this.name();
    }
}
