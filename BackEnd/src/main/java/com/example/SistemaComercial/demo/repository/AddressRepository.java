package com.example.SistemaComercial.demo.repository;

import com.example.SistemaComercial.demo.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}