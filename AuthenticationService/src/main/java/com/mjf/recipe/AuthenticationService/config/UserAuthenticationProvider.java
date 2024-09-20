package com.mjf.recipe.AuthenticationService.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.mjf.recipe.AuthenticationService.dtos.UserDTO;
import com.mjf.recipe.AuthenticationService.services.UserService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Collections;
import java.util.Date;

@RequiredArgsConstructor
@Component
@Resource
public class UserAuthenticationProvider {

    @Value("classpath:keys/privateKey.pem")
    private RSAPrivateKey privateKey;

    @Value("classpath:keys/publicKey.pem")
    private RSAPublicKey publicKey;

    private Algorithm rsa256;
    private JWTVerifier verifier;
    private final UserService userService;

    @PostConstruct
    protected void init() {
        this.rsa256 = Algorithm.RSA256(publicKey, privateKey);
        this.verifier = JWT.require(this.rsa256).build();
    }

    public String createToken(UserDTO user){
        Date now = new Date();
        Date validity = new Date(now.getTime() + 360000); // 10 min

        return JWT.create()
                .withSubject(user.getLogin())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("role", user.getRole().name())
                .sign(rsa256);
    }

    public DecodedJWT validateToken(String token) throws JWTVerificationException {
        return verifier.verify(token.replace("Bearer ", ""));
    }

    public Authentication validateTokenAndSetAuthentication(String token){
        DecodedJWT decodedJWT = verifier.verify(token);
        UserDTO user = userService.findByLogin(decodedJWT.getSubject());
        return new UsernamePasswordAuthenticationToken(user, null, Collections.singletonList(user.getRole()));
    }

}
