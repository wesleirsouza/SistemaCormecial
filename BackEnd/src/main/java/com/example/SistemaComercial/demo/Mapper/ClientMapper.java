package com.example.SistemaComercial.demo.Mapper;

import com.example.SistemaComercial.demo.DTO.ClientDTO;
import com.example.SistemaComercial.demo.model.Client;

public class ClientMapper {

    public static ClientDTO toDTO(Client client) {

        ClientDTO dto = new ClientDTO();

        dto.setId(client.getId());
        dto.setCnpjCpf(client.getCnpjCpf());
        dto.setName_companyName(client.getName_companyName());
        dto.setEmail(client.getEmail());
        dto.setCep(client.getCep());

        return dto;
    }


    public static Client toEntity(ClientDTO dto) {

        Client client = new Client();

        client.setCnpjCpf(dto.getCnpjCpf());
        client.setName_companyName(dto.getName_companyName()); // conversão aqui
        client.setEmail(dto.getEmail());
        client.setCep(dto.getCep());

        return client;
    }

    public static void updateEntity(Client client, ClientDTO dto) {

        if (dto.getName_companyName() != null)
            client.setName_companyName(dto.getName_companyName());

        if (dto.getEmail() != null)
            client.setEmail(dto.getEmail());

        if (dto.getCep() != null)
            client.setCep(dto.getCep());
    }
}