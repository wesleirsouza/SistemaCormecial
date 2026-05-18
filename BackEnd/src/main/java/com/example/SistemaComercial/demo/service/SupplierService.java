package com.example.SistemaComercial.demo.service;

import com.example.SistemaComercial.demo.DTO.SupplierDTO;
import com.example.SistemaComercial.demo.Mapper.SupplierMapper;
import com.example.SistemaComercial.demo.model.Supplier;
import com.example.SistemaComercial.demo.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public SupplierDTO create(SupplierDTO dto) {

        String cleanDocument = dto.getCnpjCpf().replaceAll("\\D", "");

        if (supplierRepository.existsByCnpjCpf(cleanDocument)) {
            throw new RuntimeException("Supplier already registered");
        }

        dto.setCnpjCpf(cleanDocument);

        Supplier supplier = SupplierMapper.toEntity(dto);

        return SupplierMapper.toDTO(supplierRepository.save(supplier));
    }

    public List<SupplierDTO> findAll(){
        return supplierRepository.findAll()
                .stream()
                .map(SupplierMapper::toDTO)
                .collect(Collectors.toList());
    }

    public SupplierDTO findById(Long id){
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        return SupplierMapper.toDTO(supplier);
    }

    public SupplierDTO update(Long id, SupplierDTO dto) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        dto.setCnpjCpf(
                dto.getCnpjCpf().replaceAll("\\D", "")
        );

        SupplierMapper.updateEntity(supplier, dto);

        return SupplierMapper.toDTO(supplierRepository.save(supplier));
    }

    public void deleteSupplier(Long id){
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + id));

        supplierRepository.delete(supplier);
    }

    public Boolean existsByCnpjCpf(String cnpj){

        String cleanDocument = cnpj.replaceAll("\\D", "");

        return supplierRepository.existsByCnpjCpf(cleanDocument);
    }
}