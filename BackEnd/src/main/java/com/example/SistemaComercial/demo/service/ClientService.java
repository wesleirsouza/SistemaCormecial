package com.example.SistemaComercial.demo.service;

import com.example.SistemaComercial.demo.DTO.ClientDTO;
import com.example.SistemaComercial.demo.Mapper.ClientMapper;
import com.example.SistemaComercial.demo.model.Client;
import com.example.SistemaComercial.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public ClientDTO findById(Long id){
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        return ClientMapper.toDTO(client);
    }

    public List<ClientDTO> findAll(){
        return clientRepository.findAll()
                .stream()
                .map(ClientMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ClientDTO create(ClientDTO dto) {
        Client client = ClientMapper.toEntity(dto);
        return ClientMapper.toDTO(clientRepository.save(client));
    }

    public Boolean existsByCnpjCpf(String cnpjCpf) {
        return clientRepository.existsByCnpjCpf(cnpjCpf);
    }


    public ClientDTO update(Long id, ClientDTO dto) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        if (dto.getCnpjCpf() != null &&
                !dto.getCnpjCpf().equals(client.getCnpjCpf()) &&
                clientRepository.existsByCnpjCpf(dto.getCnpjCpf())) {
            throw new RuntimeException("CNPJ/CPF já cadastrado");
        }

        ClientMapper.updateEntity(client, dto);

        return ClientMapper.toDTO(clientRepository.save(client));
        }


    public void deleteClient(Long id){

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        if (client.getOrder() != null && !client.getOrder().isEmpty()) {
            throw new RuntimeException("Client has orders and cannot be deleted");
        }

        clientRepository.delete(client);
    }
}
