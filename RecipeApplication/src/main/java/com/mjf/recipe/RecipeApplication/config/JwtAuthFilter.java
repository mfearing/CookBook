package com.mjf.recipe.RecipeApplication.config;

import com.mjf.recipe.RecipeApplication.dtos.UserDTO;
import com.mjf.recipe.RecipeApplication.enums.Role;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@NoArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            FilterChain filterChain) throws ServletException, IOException {
        String header = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);

        String userName = httpServletRequest.getHeader("X-User-Name");
        String userRole = httpServletRequest.getHeader("X-User-Role");

        if(userName != null && !userName.isEmpty() && userRole != null && !userRole.isEmpty()){
            UserDTO user = UserDTO.builder()
                    .login(userName)
                    .role(Role.valueOf(userRole))
                    .build();
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(user, null, Collections.singletonList(user.getRole()))
            );

        } else {
            SecurityContextHolder.clearContext();
            throw new AppException("User name and role are missing", HttpStatus.UNAUTHORIZED);
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

}
