package com.example.SistemaComercial.demo.service;

import com.example.SistemaComercial.demo.model.Customer;
import com.example.SistemaComercial.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer findById(Long id){
        return customerRepository.findById(id).get();
    }

    public List<Customer> findAll(){
        return customerRepository.findAll();
    }

    public Customer save(Customer customer){
        return customerRepository.save(customer);
    }

    public Customer delete(Customer customer){
        customerRepository.delete(customer);
        return customer;
    }
}
