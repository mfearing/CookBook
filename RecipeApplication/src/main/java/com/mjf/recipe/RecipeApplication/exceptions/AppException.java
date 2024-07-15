package com.mjf.recipe.RecipeApplication.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;

/**
 * Extends AuthenticationException because UserAuthenticationEntryPoint catches and relays the message to the client
 */
public class AppException extends AuthenticationException {
    private final HttpStatus status;

    public AppException(String message, HttpStatus status){
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return this.status;
    }
}
