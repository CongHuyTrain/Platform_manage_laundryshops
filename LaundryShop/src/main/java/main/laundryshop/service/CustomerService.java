package main.laundryshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    CustomerRespository customerRepository;

    public Customer createCustomer (Customer customer) {
        return customerRepository.save(customer);

    }
}

