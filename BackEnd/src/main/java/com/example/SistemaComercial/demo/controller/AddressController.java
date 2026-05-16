package com.example.SistemaComercial.demo.controller;

import com.example.SistemaComercial.demo.model.Address;
import com.example.SistemaComercial.demo.service.AddressService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
@CrossOrigin(origins = "http://localhost:4200")
public class AddressController {

    private final AddressService service;

    public AddressController(AddressService service) {
        this.service = service;
    }

    @GetMapping
    public List<Address> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Address findById(@PathVariable Long id) {
        return service.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));
    }

    @PostMapping
    public Address save(@RequestBody Address address) {
        return service.save(address);
    }

    @PutMapping("/{id}")
    public Address update(@PathVariable Long id,
                          @RequestBody Address address) {

        return service.update(id, address);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}