package com.mjf.recipe.RecipeApplication.utils;

import com.mjf.recipe.RecipeApplication.dtos.UserDTO;
import org.springframework.security.core.context.SecurityContextHolder;

public class RecipeUtils {

    public static String getAuthenticatedUserLogin(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDTO){
            return ((UserDTO) principal).login();
        }
        return null;
    }
}
