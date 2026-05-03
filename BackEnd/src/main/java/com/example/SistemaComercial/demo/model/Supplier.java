package com.example.SistemaComercial.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "supplier")
public class Supplier {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "company_name")
    @NotBlank(message = "The name and required")
    private String name;

    @Column(name = "cnpj_cpf", unique = true, nullable = false)
    private String cnpjCpf;

    @Column(name = "rg", nullable = false)
    private String rg;

    @Column(name = "dateOfBirth", nullable = false)
    private String dateOfBirth;

    @Column(name = "cep")
    @NotBlank(message = "The CEP and required")
    private String cep;

    @Column(name = "email")
    @NotBlank(message = "The email and required")
    private String email;

    @OneToMany(mappedBy = "supplier")
    private List<Product> products;
}
