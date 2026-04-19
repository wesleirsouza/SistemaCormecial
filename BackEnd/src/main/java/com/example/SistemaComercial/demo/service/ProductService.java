package com.example.SistemaComercial.demo.service;

import com.example.SistemaComercial.demo.model.Product;
import com.example.SistemaComercial.demo.repository.ProductRepository;
import com.example.SistemaComercial.demo.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierRepository supplierRepository;

    public Product findById(Long id){
        return productRepository.findById(id).get();
    }

    public Product save(Product product){
        return productRepository.save(product);
    }

    public Product update(Product product){
        return productRepository.save(product);
    }

    public List<Product> findAll(){
        return productRepository.findAll();
    }

    public Product deleteProduct(Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        productRepository.delete(product);
        return product;
    }
}
