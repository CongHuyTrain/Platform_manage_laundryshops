package edu.uth.manage_laundryshop.models;
import jakarta.persistence.*;
@Entity
@Table (name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
