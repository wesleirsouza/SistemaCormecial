package com.example.SistemaComercial.demo.DTO;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDTO {

    private Long id;
    private LocalDateTime order_date;
    private BigDecimal total;

    private Long clientId;

    private List<OrderItemDTO> items;
}