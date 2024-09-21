package com.mjf.recipe.AuthenticationService.controllers;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.mjf.recipe.AuthenticationService.config.UserAuthenticationProvider;
import com.mjf.recipe.AuthenticationService.dtos.CredentialsDTO;
import com.mjf.recipe.AuthenticationService.dtos.SignUpDTO;
import com.mjf.recipe.AuthenticationService.dtos.UserDTO;
import com.mjf.recipe.AuthenticationService.exceptions.AppException;
import com.mjf.recipe.AuthenticationService.services.UserService;
import com.mjf.recipe.AuthenticationService.utils.AuthUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody @Valid CredentialsDTO credentialsDto) {
        UserDTO userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody @Valid SignUpDTO user) {
        UserDTO createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/user/" + createdUser.getId())).body(createdUser);
    }

    @GetMapping("/validate")
    public Map<String, Object> validateToken(@RequestHeader("Authorization") String token) {
        Map<String, Object> response = new HashMap<>();
        try{
            DecodedJWT decodedJWT = userAuthenticationProvider.validateToken(token);
            response.put("valid", true);
        } catch (JWTVerificationException exception) {
            response.put("valid", false);
            response.put("error", "Invalid token");
        }
        return response;
    }

    @GetMapping("/user/{id}")
    public UserDTO getUserById(@PathVariable Long id){
        checkIsUserById(id);
        return userService.findById(id);
    }

    @PatchMapping("/user/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO){
        checkIsUserById(id);
        checkIsUserById(userDTO.getId());

        userService.patchUser(userDTO);
        UserDTO updatedUser = userService.findById(id);
        return ResponseEntity.created(URI.create("/user/" + updatedUser.getId())).body(updatedUser);
    }

    @GetMapping("/auth/public-key")
    public ResponseEntity<Map<String, String>> getPublicJWKS(){
        log.info("Made it to auth/public-key!");
        return ResponseEntity.ok(userAuthenticationProvider.getPublicKeyJWKS());
    }

    private void checkIsUserById(Long id){
        UserDTO userDTO = userService.findById(id);
        if(userDTO == null || !userDTO.getId().equals(AuthUtils.getAuthenticatedUserId())){
            throw new AppException("Recipe doesn't exist or does not belong to this author", HttpStatus.BAD_REQUEST);
        }
    }

}