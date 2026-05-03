package com.example.SistemaComercial.demo.Mapper;

import com.example.SistemaComercial.demo.DTO.SupplierDTO;
import com.example.SistemaComercial.demo.model.Supplier;

public class SupplierMapper {

    public static SupplierDTO toDTO(Supplier supplier) {

        SupplierDTO dto = new SupplierDTO();

        dto.setId(supplier.getId());
        dto.setName(supplier.getName());
        dto.setCnpjCpf(supplier.getCnpjCpf());
        dto.setRg(supplier.getRg());
        dto.setDateOfBirth(supplier.getDateOfBirth());
        dto.setCep(supplier.getCep());
        dto.setEmail(supplier.getEmail());

        return dto;
    }

    public static Supplier toEntity(SupplierDTO dto) {

        Supplier supplier = new Supplier();

        supplier.setName(dto.getName());
        supplier.setCnpjCpf(dto.getCnpjCpf());
        supplier.setRg(dto.getRg());
        supplier.setDateOfBirth(dto.getDateOfBirth());
        supplier.setCep(dto.getCep());
        supplier.setEmail(dto.getEmail());

        return supplier;
    }

    public static void updateEntity(Supplier supplier, SupplierDTO dto) {

        if (dto.getName() != null)
            supplier.setName(dto.getName());

        if (dto.getEmail() != null)
            supplier.setEmail(dto.getEmail());

        if (dto.getCep() != null)
            supplier.setCep(dto.getCep());

        if (dto.getRg() != null)
            supplier.setRg(dto.getRg());

        if (dto.getDateOfBirth() != null)
            supplier.setDateOfBirth(dto.getDateOfBirth());
    }
}
