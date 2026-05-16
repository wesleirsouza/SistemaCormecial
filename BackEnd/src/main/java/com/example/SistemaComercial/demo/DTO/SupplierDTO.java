package com.example.SistemaComercial.demo.DTO;

import com.example.SistemaComercial.demo.model.Address;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SupplierDTO {

    private Long id;
    private String name;
    private String cnpjCpf;
    private String rg;
    private LocalDate dateOfBirth;
    private String email;
    private AddressDTO address;
}