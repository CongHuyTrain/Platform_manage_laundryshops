package main.chgu.configuration;

import lombok.RequiredArgsConstructor;
import main.chgu.repository.UserRepository;
import main.chgu.models.User;
import main.chgu.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
public class ApplicationIntConfig {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return args -> {
            if(userRepository.findByName("admin").isEmpty()){
                var roles = new HashSet<Role>();
                roles.add(Role.ADMIN);
                User user = User.builder()
                        .name("admin")
                        .password(passwordEncoder.encode("admin"))
                        //.roles(roles)
                        .build();
                userRepository.save(user);
            }
        };
    }
}
