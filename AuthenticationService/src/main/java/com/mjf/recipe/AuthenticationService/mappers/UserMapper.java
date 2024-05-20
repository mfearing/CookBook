package com.mjf.recipe.AuthenticationService.mappers;

import com.mjf.recipe.AuthenticationService.dtos.SignUpDTO;
import com.mjf.recipe.AuthenticationService.dtos.UserDTO;
import com.mjf.recipe.AuthenticationService.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Uses mapstruct to map a User to a UserDTO, or a SignUpDTO to a User
 */
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toUserDto(User user);

    //ignore the password because it needs to be encoded
    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDTO signUpDTO);

}
