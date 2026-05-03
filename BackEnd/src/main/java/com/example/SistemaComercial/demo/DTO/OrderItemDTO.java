package com.example.SistemaComercial.demo.DTO;

import lombok.Data;

@Data
public class OrderItemDTO {

    private Long productId;
    private Integer quantity;
}