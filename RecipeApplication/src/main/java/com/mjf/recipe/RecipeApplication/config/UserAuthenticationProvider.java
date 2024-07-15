package com.mjf.recipe.RecipeApplication.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.mjf.recipe.RecipeApplication.dtos.UserDTO;
import com.mjf.recipe.RecipeApplication.enums.Role;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import java.util.Collections;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {
    private static final Logger logger = LoggerFactory.getLogger(UserAuthenticationProvider.class);

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public DecodedJWT validateToken(String token) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token.replace("Bearer ", ""));
    }

    public Authentication validateTokenAndSetAuthentication(String token) {

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://10.0.4.58:8181/validate")) //make this configurable
                    .header("Authorization", "Bearer " + token)
                    .GET().build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            JSONObject responseBody = new JSONObject(response.body());

            if(!responseBody.getBoolean("valid")){
                throw new RuntimeException(responseBody.getString("error"));
            } else {
                Base64.Decoder decoder = Base64.getUrlDecoder();
                String[] chunks = token.split("\\.");
                JSONObject jsonObject = new JSONObject(new String(decoder.decode(chunks[1])));

                UserDTO user = new UserDTO();
                user.setLogin(jsonObject.getString("sub"));
                user.setRole(Role.valueOf(jsonObject.getString("role")));

                return new UsernamePasswordAuthenticationToken(user, null, Collections.singletonList(user.getRole()));
            }

        } catch (IOException | InterruptedException | RuntimeException e){
            logger.debug(e.getMessage());
            throw new AppException(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }

    }

}
