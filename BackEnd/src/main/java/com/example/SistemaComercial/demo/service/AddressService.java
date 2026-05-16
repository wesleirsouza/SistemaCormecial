package com.example.SistemaComercial.demo.service;

import com.example.SistemaComercial.demo.model.Address;
import com.example.SistemaComercial.demo.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    private final AddressRepository repository;

    public AddressService(AddressRepository repository) {
        this.repository = repository;
    }

    public List<Address> findAll() {
        return repository.findAll();
    }

    public Optional<Address> findById(Long id) {
        return repository.findById(id);
    }

    public Address save(Address address) {
        return repository.save(address);
    }

    public Address update(Long id, Address addressUpdated) {

        return repository.findById(id)
                .map(address -> {

                    address.setCep(addressUpdated.getCep());
                    address.setStreet(addressUpdated.getStreet());
                    address.setCity(addressUpdated.getCity());
                    address.setState(addressUpdated.getState());

                    return repository.save(address);
                })
                .orElseThrow(() -> new RuntimeException("Address not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}