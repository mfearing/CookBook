package com.mjf.recipe.RecipeApplication.config;

import com.mjf.recipe.RecipeApplication.dtos.UserDTO;
import com.mjf.recipe.RecipeApplication.enums.Role;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    public Authentication validateTokenAndSetAuthentication(String token) throws IOException, InterruptedException {

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://10.0.4.58:8181/validate")) //make this configurable
                    .header("Authorization", "Bearer " + token)
                    .GET().build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            JSONObject responseBody = new JSONObject(response.body());

            if(responseBody.getBoolean("valid")){
                Base64.Decoder decoder = Base64.getUrlDecoder();
                String[] chunks = token.split("\\.");
                JSONObject jsonObject = new JSONObject(new String(decoder.decode(chunks[1])));

                UserDTO user = new UserDTO();
                user.setLogin(jsonObject.getString("sub"));
                user.setRole(Role.valueOf(jsonObject.getString("role")));

                return new UsernamePasswordAuthenticationToken(user, null, Collections.singletonList(user.getRole()));
            }

            throw new AppException("Unauthorized path", HttpStatus.UNAUTHORIZED);
    }

}
