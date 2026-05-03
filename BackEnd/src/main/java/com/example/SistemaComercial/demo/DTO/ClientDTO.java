package com.example.SistemaComercial.demo.DTO;

import lombok.Data;

@Data
public class ClientDTO {

    private Long id;
    private String cnpjCpf;
    private String name_companyName;
    private String email;
    private String cep;
}