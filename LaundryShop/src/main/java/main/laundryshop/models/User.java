package main.laundryshop.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false, unique = true, columnDefinition = "VARCHAR(255)")
    private String name;
    private String password;
    private String email;
    private String phone;
    private String address;

    @ManyToMany
    private Set<Role> roles;

}