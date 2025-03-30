package main.laundryshop.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import main.laundryshop.models.User;
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByName(String Name);

    Optional<User> findByName(String Name);
}
