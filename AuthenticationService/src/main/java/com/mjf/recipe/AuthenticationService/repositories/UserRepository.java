package com.mjf.recipe.AuthenticationService.repositories;

import com.mjf.recipe.AuthenticationService.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLogin(String login);
}
