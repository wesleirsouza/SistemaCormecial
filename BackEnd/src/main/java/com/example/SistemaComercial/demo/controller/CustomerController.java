package com.example.SistemaComercial.demo.controller;

import com.example.SistemaComercial.demo.model.Customer;
import com.example.SistemaComercial.demo.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/customer")
    public List<Customer> getCustomers() {
        return customerService.findAll();
    }

    @PostMapping("/customer")
    public Customer saveCustomer(@RequestBody Customer customer) {
        return customerService.save(customer);
    }

    @PutMapping("/customer")
    public Customer updateCustomer(@RequestBody Customer customer) {
        return customerService.save(customer);
    }

    @DeleteMapping("/customer")
    public ResponseEntity<Void> deleteCustomer(@Valid @RequestBody Customer customer) {
        return ResponseEntity.ok().build();
    }
}
