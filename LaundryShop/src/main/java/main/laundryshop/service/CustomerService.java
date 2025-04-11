package main.laundryshop.service;

import main.laundryshop.models.Customer;
import main.laundryshop.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(UUID id, Customer customer) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        existingCustomer.setName(customer.getName());
        existingCustomer.setPhone(customer.getPhone());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setAddress(customer.getAddress());
        existingCustomer.setOrderCount(customer.getOrderCount());
        existingCustomer.setType(customer.getType());
        existingCustomer.setNote(customer.getNote());
        return customerRepository.save(existingCustomer);
    }

    public void deleteCustomer(UUID id) {
        customerRepository.deleteById(id);
    }
}