package com.example.SistemaComercial.demo.service;

import com.example.SistemaComercial.demo.DTO.ProductDTO;
import com.example.SistemaComercial.demo.Mapper.ProductMapper;
import com.example.SistemaComercial.demo.model.Product;
import com.example.SistemaComercial.demo.repository.ProductRepository;
import com.example.SistemaComercial.demo.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    public ProductDTO create(ProductDTO dto) {
        Product product = ProductMapper.toEntity(dto, supplierRepository);
        return ProductMapper.toDTO(productRepository.save(product));
    }

    public List<ProductDTO> findAll() {
        return productRepository.findAll()
                .stream()
                .map(ProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return ProductMapper.toDTO(product);
    }

    public ProductDTO update(Long id, ProductDTO dto) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductMapper.updateEntity(product, dto, supplierRepository);

        return ProductMapper.toDTO(productRepository.save(product));
    }


    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.delete(product);
    }
}