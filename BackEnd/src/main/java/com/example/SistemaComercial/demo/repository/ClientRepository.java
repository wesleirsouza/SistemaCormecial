package com.example.SistemaComercial.demo.repository;

import com.example.SistemaComercial.demo.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {

    boolean existsByCnpjCpf(String cnpjCpf);
}