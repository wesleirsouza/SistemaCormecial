package com.example.SistemaComercial.demo.DTO;

import lombok.Data;

@Data
public class SupplierDTO {

    private Long id;
    private String name;
    private String cnpjCpf;
    private String rg;
    private String dateOfBirth;
    private String cep;
    private String email;
}