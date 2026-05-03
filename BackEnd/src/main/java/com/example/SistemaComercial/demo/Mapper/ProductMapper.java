package com.example.SistemaComercial.demo.Mapper;

import com.example.SistemaComercial.demo.DTO.ProductDTO;
import com.example.SistemaComercial.demo.model.Product;
import com.example.SistemaComercial.demo.model.Supplier;
import com.example.SistemaComercial.demo.repository.SupplierRepository;

public class ProductMapper {

    public static Product toEntity(ProductDTO dto, SupplierRepository supplierRepository) {

        Product product = new Product();

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock_quantity(dto.getStock_quantity());

        if (dto.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(dto.getSupplierId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            product.setSupplier(supplier);
        }

        return product;
    }

    public static ProductDTO toDTO(Product product) {

        ProductDTO dto = new ProductDTO();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock_quantity(product.getStock_quantity());

        if (product.getSupplier() != null) {
            dto.setSupplierId(product.getSupplier().getId());
        }

        return dto;
    }

    public static void updateEntity(Product product, ProductDTO dto, SupplierRepository supplierRepository) {

        if (dto.getName() != null)
            product.setName(dto.getName());

        if (dto.getDescription() != null)
            product.setDescription(dto.getDescription());

        if (dto.getPrice() != null)
            product.setPrice(dto.getPrice());

        if (dto.getStock_quantity() != null)
            product.setStock_quantity(dto.getStock_quantity());

        if (dto.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(dto.getSupplierId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            product.setSupplier(supplier);
        }
    }
}