package com.mjf.recipe.CookBookApplication.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.mjf.recipe.CookBookApplication.dtos.UserDTO;
import com.mjf.recipe.CookBookApplication.enums.Role;
import com.mjf.recipe.CookBookApplication.exceptions.AppException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.interfaces.RSAPublicKey;
import java.util.Base64;
import java.util.Collections;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {

    @Value("classpath:keys/publicKey.pem")
    private RSAPublicKey publicKey;

    private JWTVerifier verifier;

    @PostConstruct
    protected void init() {
        Algorithm rsa256 = Algorithm.RSA256(publicKey, null);
        this.verifier = JWT.require(rsa256).build();
    }

    public Authentication validateTokenAndSetAuthentication(String token) throws InterruptedException {

        try {
            verifier.verify(token);

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
