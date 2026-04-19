package com.example.SistemaComercial.demo.controller;

import com.example.SistemaComercial.demo.model.Supplier;
import com.example.SistemaComercial.demo.service.SupplierService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/supplier")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @PostMapping("/supplier")
    public Supplier createSupplier(@RequestBody Supplier supplier) {
        return supplierService.save(supplier);
    }

    @GetMapping("/supplier")
    public List<Supplier> findAllSupplier(){
        return supplierService.findAll();
    }

    @GetMapping("/supplier/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
        Supplier supplier = supplierService.findById(id);
        return ResponseEntity.ok(supplier);
    }

    @PutMapping("/supplier/{id}")
    public ResponseEntity<Supplier> updateSupplier(@Valid @RequestBody Supplier supplierUpdated){
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/supplier")
    public ResponseEntity<Void> deleteSupplier(@Valid @RequestBody Supplier supplier){
        return ResponseEntity.ok().build();
    }
}
