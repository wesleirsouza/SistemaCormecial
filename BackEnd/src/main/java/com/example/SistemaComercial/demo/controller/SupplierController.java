package com.example.SistemaComercial.demo.controller;

import com.example.SistemaComercial.demo.DTO.SupplierDTO;
import com.example.SistemaComercial.demo.service.SupplierService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @PostMapping("/supplier")
    public ResponseEntity<?> create(@RequestBody @Valid SupplierDTO dto) {
        try {
            return ResponseEntity.ok(supplierService.create(dto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/supplier/{id}")
    public ResponseEntity<SupplierDTO> update(
            @PathVariable Long id,
            @RequestBody SupplierDTO dto) {

        return ResponseEntity.ok(supplierService.update(id, dto));
    }

    @GetMapping("/supplier")
    public ResponseEntity<List<SupplierDTO>> findAll(){
        return ResponseEntity.ok(supplierService.findAll());
    }

    @GetMapping("/supplier/{id}")
    public ResponseEntity<SupplierDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(supplierService.findById(id));
    }

    @GetMapping("/check-cnpj")
    public ResponseEntity<Boolean> checkCnpj(
            @RequestParam String cnpj){

        return ResponseEntity.ok(
                supplierService.existsByCnpjCpf(cnpj)
        );

    }

    @DeleteMapping("supplier/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        supplierService.deleteSupplier(id);
        return ResponseEntity.noContent().build();
    }
}