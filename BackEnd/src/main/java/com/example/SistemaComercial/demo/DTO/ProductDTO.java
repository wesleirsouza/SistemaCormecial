package com.example.SistemaComercial.demo.DTO;

import lombok.Data;

@Data
public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock_quantity;

    private Long supplierId;
}