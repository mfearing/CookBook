package com.mjf.recipe.AuthenticationService.entities;

import com.mjf.recipe.AuthenticationService.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    @Size(max=100)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @Size(max=100)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    @Size(max=50)
    private String login;

    @Column(nullable = false)
    @Size(max=50)
    private String password;

    @Column
    private Date createdAt;

    @Column
    private Date updatedAt;

    @Column(columnDefinition = "text")
    private String preferences;

}
