package main.laundryshop.controllers;

import main.laundryshop.repositories.UserRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.geom.RectangularShape;

@RestController
@RequestMapping("/users")

public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity register (@RequestBody User user) {
        userRespository.save(user);
        return new ResponseEntity("Dang ky thanh cong!", HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity login (@RequestBody User user) {
        List<User> user = userRepository.findAllByUsernameAndPassword(user.getUsername(), user.getPassword());
        return new ResponseEntity (users, HttpStatus.OK);
    }

}


