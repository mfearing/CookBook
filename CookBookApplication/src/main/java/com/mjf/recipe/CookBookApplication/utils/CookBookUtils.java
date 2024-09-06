package com.mjf.recipe.CookBookApplication.utils;

import com.mjf.recipe.CookBookApplication.dtos.UserDTO;
import org.springframework.security.core.context.SecurityContextHolder;

public class CookBookUtils {

    public static String getAuthenticatedUserLogin(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDTO){
            return ((UserDTO) principal).getLogin();
        }
        return null;
    }

}
