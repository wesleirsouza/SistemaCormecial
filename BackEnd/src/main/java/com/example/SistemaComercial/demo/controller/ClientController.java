package com.example.SistemaComercial.demo.controller;

import com.example.SistemaComercial.demo.DTO.ClientDTO;
import com.example.SistemaComercial.demo.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/client")
    public ResponseEntity<List<ClientDTO>> findAll() {
        return ResponseEntity.ok(clientService.findAll());
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<ClientDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.findById(id));
    }

    @PostMapping("/client")
    public ResponseEntity<?> create(@RequestBody @Valid ClientDTO dto) {
        try {
            return ResponseEntity.ok(clientService.create(dto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/client/{id}")
    public ResponseEntity<ClientDTO> update(
            @PathVariable Long id,
            @RequestBody ClientDTO dto) {

        return ResponseEntity.ok(clientService.update(id, dto));
    }

    @DeleteMapping("/client/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}