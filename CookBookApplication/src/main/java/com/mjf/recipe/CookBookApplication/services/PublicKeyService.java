package com.mjf.recipe.CookBookApplication.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.mjf.recipe.CookBookApplication.exceptions.AppException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.Map;

/*
TODO: this design currently requires the service to be restarted.  Implementing key rotation can get around a restart.

Also, this will likely be replaced in the future by a Spring Cloud Gateway that handles verification before a request
ever hits the microservice.
 */
@Service
@RequiredArgsConstructor
public class PublicKeyService {

    private final static Logger logger = LoggerFactory.getLogger(PublicKeyService.class);

    private final RestTemplate restTemplate;
    private RSAPublicKey publicKey;
    private JWTVerifier verifier;

    @Value("${auth.service.url}")
    private String authServiceUrl;

    private RSAPublicKey getPublicKey() throws NoSuchAlgorithmException, InvalidKeySpecException {
        String url = authServiceUrl + "/v1/auth/public-key";
        Map<String, String> response = (Map<String, String>) restTemplate.getForObject(url, Map.class);

        assert response != null;
        byte[] modulusBytes = Base64.getUrlDecoder().decode(response.get("n"));
        byte[] exponentBytes = Base64.getUrlDecoder().decode(response.get("e"));

        BigInteger modulus = new BigInteger(1, modulusBytes);
        BigInteger exponent = new BigInteger(1, exponentBytes);

        RSAPublicKeySpec spec = new RSAPublicKeySpec(modulus, exponent);
        KeyFactory factory = KeyFactory.getInstance("RSA");


        return (RSAPublicKey) factory.generatePublic(spec);
    }

    private RSAPublicKey getRSAPublicKey() {
        try {
            if (publicKey == null) {
                publicKey = getPublicKey();
            }
            return publicKey;
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e){
            logger.info("went wrong in getRSAPublicKey");
            throw new AppException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public JWTVerifier getVerifier() {
        if (verifier == null) {
            Algorithm rsa256 = Algorithm.RSA256(getRSAPublicKey(), null);
            this.verifier = JWT.require(rsa256).build();
        }
        return verifier;
    }

}
