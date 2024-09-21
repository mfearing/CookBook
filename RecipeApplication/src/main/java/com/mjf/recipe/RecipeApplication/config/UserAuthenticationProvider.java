package com.mjf.recipe.RecipeApplication.config;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.mjf.recipe.RecipeApplication.dtos.UserDTO;
import com.mjf.recipe.RecipeApplication.enums.Role;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import com.mjf.recipe.RecipeApplication.services.PublicKeyService;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;

@AllArgsConstructor
@Component
public class UserAuthenticationProvider {

    private PublicKeyService publicKeyService;

    public Authentication validateTokenAndSetAuthentication(String token) throws InterruptedException {

        try {
            publicKeyService.getVerifier().verify(token);

            Base64.Decoder decoder = Base64.getUrlDecoder();
            String[] chunks = token.split("\\.");
            JSONObject jsonObject = new JSONObject(new String(decoder.decode(chunks[1])));

            UserDTO user = UserDTO.builder()
                    .login(jsonObject.getString("sub"))
                    .role(Role.valueOf(jsonObject.getString("role")))
                    .build();

            return new UsernamePasswordAuthenticationToken(user, null, Collections.singletonList(user.getRole()));

        } catch (JWTVerificationException e){

            throw new AppException("Unauthorized path", HttpStatus.UNAUTHORIZED);
        }

    }

}
