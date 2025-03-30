package edu.uth.manage_laundryshop.services;
import edu.uth.manage_laundryshop.models.User;
import edu.uth.manage_laundryshop.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public User save(User user) {
        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
        //Thêm method kiểm tra username đã tồn tại chưa
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
