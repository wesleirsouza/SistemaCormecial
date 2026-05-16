package com.example.SistemaComercial.demo.DTO;

import lombok.Data;

@Data
public class AddressDTO {

    private Long id;
    private String cep;
    private String street;
    private String city;
    private String state;
}
