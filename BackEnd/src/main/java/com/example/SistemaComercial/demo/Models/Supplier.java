package com.example.SistemaComercial.demo.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @NotBlank
    private Long id;
    private Number cnpj;
    private Number cpf;
    private String name;
    private Number cep;
    private Number rg;
    @Past
    private Number dataDeNascimento;
    @Email
    private String email;
    }
