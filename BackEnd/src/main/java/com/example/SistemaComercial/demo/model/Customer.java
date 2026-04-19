package com.example.SistemaComercial.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "CNPJ é obrigatório")
    @Column(nullable = false, unique = true)
    private Number cnpj;

    @NotBlank(message = "CPF é obrigatório")
    @Column(nullable = false, unique = true)
    private String cpf;

    @NotBlank(message = "Name é obrigatório")
    private String name;

    @NotBlank(message = "Email é obrigatório")
    private String email;

    @NotBlank(message = "CEP é obrigatório")
    private String cep;
}
