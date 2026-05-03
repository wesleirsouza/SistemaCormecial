package com.example.SistemaComercial.demo.repository;

import com.example.SistemaComercial.demo.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}