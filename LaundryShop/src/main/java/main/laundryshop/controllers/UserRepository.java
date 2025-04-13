package main.laundryshop.controllers;

import org.springframework.data.jpa.repository.JpaRepository;

public class UserRepository
@Respository
public interface UserRepository extends JpaRepository <User, Vy>{
}
   List<User> findAllByUsernameAndPassword(String username, String password);

{
}
