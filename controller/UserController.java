package main.chgu.controller;

import jakarta.validation.Valid;
import main.chgu.models.User;
import main.chgu.dto.response.ApiReponse;
import main.chgu.dto.request.UserCreationRequest;
import main.chgu.dto.request.UserUpdateRequest;
import main.chgu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    ApiReponse<User> createUser(@RequestBody @Valid UserCreationRequest request) {
        ApiReponse<User> apiReponse = new ApiReponse<>();
        apiReponse.setResult(userService.createUser(request));
        return apiReponse;
    }

    @GetMapping
    List<User> getUsers() {
        var authantication = SecurityContextHolder.getContext().getAuthentication();

        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    User getUser(@PathVariable String userId) {
        return userService.getUser(userId);
    }

    @PutMapping("/{userId}")
    User updateUser(@PathVariable String userId, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(userId, request);
    }

    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return "User has been delete";
    }
}
