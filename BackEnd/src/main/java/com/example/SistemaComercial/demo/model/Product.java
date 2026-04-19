package com.example.SistemaComercial.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    private String description;

    @NotBlank(message = "Preço é obrigatório")
    @Min(value = 0, message = "O price não pode ser negativo")
    @Positive(message = "O valor deve ser maior que zero")
    private Number price;

    @NotBlank(message = "A quantiade é obrigatório")
    @Min(value = 1, message = " deve ser no mínimo 1")
    @PositiveOrZero(message = "O valor não pode ser negativo")
    private int amount;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id")
    private Supplier supplier;
}