package com.mjf.recipe.AuthenticationService.mappers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mjf.recipe.AuthenticationService.dtos.SignUpDTO;
import com.mjf.recipe.AuthenticationService.dtos.UserDTO;
import com.mjf.recipe.AuthenticationService.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.HashMap;
import java.util.Map;

/**
 * Uses mapstruct to map a User to a UserDTO, or a SignUpDTO to a User
 */
@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "preferences", source = "preferences")
    @Mapping(target = "token", ignore = true)
    UserDTO toUserDTO(User user);

    @Mapping(target = "preferences", source = "preferences")
    @Mapping(target = "password", ignore = true)
    User toUser(UserDTO userDTO);

    //ignore the password because it needs to be encoded
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "preferences", ignore = true)
    User signUpToUser(SignUpDTO signUpDTO);

    // Custom method to map String (JSON) to Map<String, Object>
    default Map<String, Object> mapStringToMap(String preferencesJson) {
        if (preferencesJson == null || preferencesJson.isEmpty()) {
            return new HashMap<>();
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(preferencesJson, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Error parsing JSON", e);
        }
    }

    // Custom method to map Map<String, Object> to String (JSON)
    default String mapMapToString(Map<String, Object> preferences) {
        if (preferences == null || preferences.isEmpty()) {
            return "";
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(preferences);
        } catch (Exception e) {
            throw new RuntimeException("Error converting Map to JSON String", e);
        }
    }

}
