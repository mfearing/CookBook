package com.mjf.recipe.AuthenticationService.config;

import com.mjf.recipe.AuthenticationService.entities.User;
import com.mjf.recipe.AuthenticationService.enums.Role;
import com.mjf.recipe.AuthenticationService.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataLoader {

    @Bean
    CommandLineRunner insertDefaultAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder){
        return args -> {
            if(userRepository.findByLogin("cookbook").isEmpty()){
                User cookbookUser = User.builder()
                        .firstName("Cook")
                        .lastName("Book")
                        .login("cookbook")
                        .password(passwordEncoder.encode("password"))
                        .role(Role.ADMIN)
                        .createdAt(new Date())
                        .updatedAt(new Date())
                        .build();
                userRepository.save(cookbookUser);
            }
        };
    }

}
