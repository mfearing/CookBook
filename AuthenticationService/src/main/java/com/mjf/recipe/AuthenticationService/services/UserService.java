package com.mjf.recipe.AuthenticationService.services;

import com.mjf.recipe.AuthenticationService.dtos.CredentialsDTO;
import com.mjf.recipe.AuthenticationService.dtos.SignUpDTO;
import com.mjf.recipe.AuthenticationService.dtos.UserDTO;
import com.mjf.recipe.AuthenticationService.entities.User;
import com.mjf.recipe.AuthenticationService.enums.Role;
import com.mjf.recipe.AuthenticationService.exceptions.AppException;
import com.mjf.recipe.AuthenticationService.mappers.UserMapper;
import com.mjf.recipe.AuthenticationService.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.CharBuffer;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    public UserDTO login(CredentialsDTO credentialsDTO){
        User user = userRepository.findByLogin(credentialsDTO.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if(passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.getPassword()), user.getPassword())){
            return userMapper.toUserDTO(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDTO register(SignUpDTO signUpDTO){
        Optional<User> optionalUser = userRepository.findByLogin(signUpDTO.getLogin());
        if(optionalUser.isPresent()){
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(signUpDTO);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDTO.getPassword())));
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);
        return userMapper.toUserDTO(savedUser);
    }

    public UserDTO findByLogin(String login){
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDTO(user);
    }

    public UserDTO findById(Long id){
        User user = userRepository.findById(id).orElse(null);
        return userMapper.toUserDTO(user);
    }

    @Transactional
    public void patchUser(UserDTO userDTO){
        Optional<User> user = userRepository.findById(userDTO.getId());
        if(user.isPresent()){
            User existing = user.get();

            if(userDTO.getFirstName() != null && !userDTO.getFirstName().isEmpty()){
                existing.setFirstName(userDTO.getFirstName());
            }

            if(userDTO.getLastName() != null && !userDTO.getLastName().isEmpty()){
                existing.setLastName(userDTO.getLastName());
            }

            if(userDTO.getPreferences() != null) {
                existing.setPreferences(userMapper.mapMapToString(userDTO.getPreferences()));
            }

            existing.setUpdatedAt(new Date());
            userRepository.saveAndFlush(existing);
        } else {
            throw new AppException("User patch failed.  User not found", HttpStatus.BAD_REQUEST);
        }
    }



}
