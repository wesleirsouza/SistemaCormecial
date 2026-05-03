package com.example.SistemaComercial.demo.Mapper;

import com.example.SistemaComercial.demo.DTO.OrderDTO;
import com.example.SistemaComercial.demo.model.Order;

public class OrderMapper {

    public static OrderDTO toDTO(Order order) {

        OrderDTO dto = new OrderDTO();

        dto.setId(order.getId());
        dto.setOrder_date(order.getOrder_date());
        dto.setTotal(order.getTotal());

        if (order.getClient() != null) {
            dto.setClientId(order.getClient().getId());
        }

        return dto;
    }
}