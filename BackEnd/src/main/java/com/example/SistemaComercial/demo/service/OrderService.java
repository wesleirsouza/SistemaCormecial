package com.example.SistemaComercial.demo.service;

import com.example.SistemaComercial.demo.DTO.OrderItemDTO;
import com.example.SistemaComercial.demo.DTO.OrderDTO;
import com.example.SistemaComercial.demo.Mapper.OrderMapper;
import com.example.SistemaComercial.demo.model.*;
import com.example.SistemaComercial.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProductRepository productRepository;

    public OrderDTO create(OrderDTO dto) {

        if (dto.getItems() == null || dto.getItems().isEmpty()) {
            throw new RuntimeException("Order cannot be empty");
        }

        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Order order = new Order();
        order.setClient(client);
        order.setOrder_date(LocalDateTime.now());

        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> items = new ArrayList<>();

        for (OrderItemDTO itemDTO : dto.getItems()) {

            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock_quantity() < itemDTO.getQuantity()) {
                throw new RuntimeException(
                        "Insufficient stock for product: " + product.getName()
                );
            }

            product.setStock_quantity(
                    product.getStock_quantity() - itemDTO.getQuantity()
            );

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemDTO.getQuantity());
            item.setPrice(BigDecimal.valueOf(product.getPrice()));

            total = total.add(
                    BigDecimal.valueOf(product.getPrice())
                            .multiply(BigDecimal.valueOf(itemDTO.getQuantity()))
            );

            items.add(item);
        }

        order.setItems(items);
        order.setTotal(total);

        return OrderMapper.toDTO(orderRepository.save(order));
    }

    public List<OrderDTO> findAll() {
        return orderRepository.findAll()
                .stream()
                .map(OrderMapper::toDTO)
                .toList();
    }

    public OrderDTO findById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return OrderMapper.toDTO(order);
    }

    public void deleteById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        orderRepository.delete(order);
    }
}