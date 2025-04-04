package main.laundryshop.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import main.laundryshop.models.User;
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByName(String name);
    boolean existsByName(String name);
    //{
//        return false;
//    }
//    default User save(User user) {
//        return null;
//    }
//
//    default List<User> findAll() {
//        return null;
//    }
//    default Optional<User> findById(Long id) {
//        return Optional.empty();
//    }

}

