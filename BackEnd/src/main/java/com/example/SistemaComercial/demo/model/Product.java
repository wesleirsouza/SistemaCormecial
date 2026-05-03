package com.example.SistemaComercial.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    @NotBlank(message = "The name and required")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="price", nullable = false)
    @NotNull(message = "The price and required")
    @Positive(message = "The value must be greater than zero.")
    private Double price;

    @Column(name="stock_quantity",  nullable = false)
    @NotNull(message = "The stock_quantity and required")
    @Min(value = 0, message = "The value cannot be negative.")
    private Integer stock_quantity;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    @JsonIgnore
    private Supplier supplier;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<OrderItem> items;

    public boolean getStock() {
        return stock_quantity > 0;
    }
    public void setStock(int i) {
        this.stock_quantity = i;
    }
}