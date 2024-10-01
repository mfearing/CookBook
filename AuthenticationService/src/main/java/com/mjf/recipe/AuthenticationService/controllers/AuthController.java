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
@RequestMapping("/auth")
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
        UserDTO user = userService.findById(id);
        checkIsUser(id, user);
        return user;
    }

    @PatchMapping("/user/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO){
        checkIsUser(id, userDTO);
        if(!id.equals(userDTO.getId())){
            throw new AppException("Account being modified does not belong to this author", HttpStatus.BAD_REQUEST);
        }

        userService.patchUser(userDTO);
        UserDTO updatedUser = userService.findById(id);
        return ResponseEntity.created(URI.create("/user/" + updatedUser.getId())).body(updatedUser);
    }

    @GetMapping("/public-key")
    public ResponseEntity<Map<String, String>> getPublicJWKS(){
        return ResponseEntity.ok(userAuthenticationProvider.getPublicKeyJWKS());
    }

    //the spring context, the id, and the user dto all need to be the same
    //TODO: Should we include user id in the claims of the JWT?  Would make this easier.
    private void checkIsUser(Long id, UserDTO userDTO){
        UserDTO existing = userService.findById(id);
        String authLogin = AuthUtils.getAuthenticatedUserLogin();
        if(existing == null || //user from id has to exist
            !existing.getLogin().equals(authLogin) || //user from id has to match principal
            !userDTO.getLogin().equals(authLogin) || //userDTO from payload has to match principal
            !existing.getId().equals(id) //user from id has to match userDTO from payload
        ){
            log.info("User id: {}, authenticated user id: {}", userDTO.getLogin(), authLogin);
            throw new AppException("Account does not belong to this author", HttpStatus.BAD_REQUEST);
        }
    }



}