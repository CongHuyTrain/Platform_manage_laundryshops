package main.laundryshop.controllers;

import main.laundryshop.models.Customer;
import main.laundryshop.service.CustomerService; // Sửa service thành services
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/v1")
public class RegisterController {

    private final CustomerService customerService;

    @Autowired
    public RegisterController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer) {
        try {
            Customer savedCustomer = customerService.createCustomer(customer);

            if (savedCustomer != null && savedCustomer.getId() != null) {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body("Customer created successfully with id = " + savedCustomer.getId());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Failed to create customer. Invalid data.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred on the server. Please try again later.");
        }
    }
}
