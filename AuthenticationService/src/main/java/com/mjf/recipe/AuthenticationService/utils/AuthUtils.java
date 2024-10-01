package com.mjf.recipe.AuthenticationService.utils;

import com.mjf.recipe.AuthenticationService.dtos.UserDTO;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthUtils {

    public static String getAuthenticatedUserLogin(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDTO){
            return ((UserDTO) principal).getLogin();
        }
        return null;
    }

}
