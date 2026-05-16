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

        dto.setAddress(
                AddressMapper.toDTO(client.getAddress())
        );

        return dto;
    }


    public static Client toEntity(ClientDTO dto) {

        Client client = new Client();

        client.setId(dto.getId());
        client.setCnpjCpf(dto.getCnpjCpf());
        client.setName_companyName(dto.getName_companyName());
        client.setEmail(dto.getEmail());

        client.setAddress(
                AddressMapper.toEntity(dto.getAddress())
        );

        return client;
    }

    public static void updateEntity(Client client, ClientDTO dto) {

        if (dto.getName_companyName() != null)
            client.setName_companyName(dto.getName_companyName());

        if (dto.getEmail() != null)
            client.setEmail(dto.getEmail());

        if (dto.getCnpjCpf() != null)
            client.setCnpjCpf(dto.getCnpjCpf());

        if (dto.getAddress() != null)
            client.setAddress(
                    AddressMapper.toEntity(dto.getAddress())
            );
    }
}