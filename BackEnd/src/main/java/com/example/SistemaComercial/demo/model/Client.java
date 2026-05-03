package com.example.SistemaComercial.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "cnpj_cpf",unique = true, nullable = false)
    private String cnpjCpf;

    @Column(name = "name_companyName")
    @NotBlank(message = "The name_companyName and required")
    private String name_companyName;

    @Column(name = "email")
    @NotBlank(message = "The email and required")
    private String email;

    @Column(name="CEP")
    @NotBlank(message = "The CEP and required")
    private String cep;

    @OneToMany(mappedBy = "client")
    @JsonIgnore
    private List<Order> order;


}
