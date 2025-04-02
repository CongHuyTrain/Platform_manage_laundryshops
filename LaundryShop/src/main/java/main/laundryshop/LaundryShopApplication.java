package main.laundryshop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@SpringBootApplication
public class LaundryShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(LaundryShopApplication.class, args);
    }

}
