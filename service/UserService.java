package main.chgu.service;

import lombok.extern.slf4j.Slf4j;
import main.chgu.dto.response.UserReponse;
import main.chgu.mapper.UserMapper;
import main.chgu.repository.UserRepository;
import main.chgu.models.User;
import main.chgu.dto.request.UserCreationRequest;
import main.chgu.dto.request.UserUpdateRequest;
import main.chgu.enums.Role;
import main.chgu.exception.AppException;
import main.chgu.exception.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserMapper userMapper;

    public UserReponse createUser(UserCreationRequest request){
        if (userRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        HashSet<Role> roles = new HashSet<>();
        roles.add(Role.USER);
        //user.setRoles(roles);

        return userMapper.toUserReponse(userRepository.save(user));
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public UserReponse getUser(String id){
        log.info("In method getUser");
        return userMapper.toUserReponse(userRepository.findById(id).
                orElseThrow(()-> new RuntimeException("user not found")));
    }

    public UserReponse updateUser(String userId, UserUpdateRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new RuntimeException("user not found"));

        userMapper.updateUser(user, request);

        return userMapper.toUserReponse(userRepository.save(user));
    }

    public void deleteUser(String userId){
        userRepository.deleteById(userId);
    }
}
