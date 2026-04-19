package com.example.SistemaComercial.demo.service;

import com.example.SistemaComercial.demo.model.Supplier;
import com.example.SistemaComercial.demo.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    public Supplier save(Supplier supplier){
        return supplierRepository.save(supplier);
    }

    public List<Supplier> findAll(){
        return supplierRepository.findAll();
    }

    public Supplier findById(Long id){
        return supplierRepository.findById(id).get();
    }

    public Supplier deleteSupplier(Long id){
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + id));

        supplierRepository.delete(supplier);
        return supplier;
    }

}
