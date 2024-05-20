package com.mjf.recipe.AuthenticationService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * This Authentication application is based on Sergio Lema's authentication backend with very minor changes
 * https://github.com/serlesen/fullstack-jwt/tree/chapter_3
 */
@SpringBootApplication
public class AuthenticationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthenticationServiceApplication.class, args);
	}

}
