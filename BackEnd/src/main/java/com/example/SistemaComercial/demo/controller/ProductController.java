package com.example.SistemaComercial.demo.controller;

import com.example.SistemaComercial.demo.model.Product;
import com.example.SistemaComercial.demo.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/product")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/product")
    public Product saveProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).get();
    }

    @PutMapping("/product")
    public Product updateProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @DeleteMapping("/product")
    public ResponseEntity<Void> deleteProduct(@Valid @RequestBody Product product){
        return ResponseEntity.ok().build();
    }
}
