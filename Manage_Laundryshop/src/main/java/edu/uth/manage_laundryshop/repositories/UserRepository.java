package edu.uth.manage_laundryshop.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import edu.uth.manage_laundryshop.models.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    default boolean existsByUsername(String username) {
        return false;
    }
    default User save(User user) {
        return null;
    }

    default List<User> findAll() {
        return null;
    }
    default Optional<User> findById(Long id) {
        return Optional.empty();
    }

}
