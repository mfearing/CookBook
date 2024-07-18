package com.mjf.recipe.RecipeApplication.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mjf.recipe.RecipeApplication.dtos.ErrorDTO;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

        if(authException instanceof AppException){
            OBJECT_MAPPER.writeValue(response.getOutputStream(), new ErrorDTO(authException.getMessage()));
        } else {
            OBJECT_MAPPER.writeValue(response.getOutputStream(), new ErrorDTO("Unauthorized path"));
        }

    }
}
