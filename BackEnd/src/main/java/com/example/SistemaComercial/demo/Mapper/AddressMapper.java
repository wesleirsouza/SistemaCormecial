package com.example.SistemaComercial.demo.Mapper;

import com.example.SistemaComercial.demo.DTO.AddressDTO;
import com.example.SistemaComercial.demo.model.Address;

public class AddressMapper {

    public static AddressDTO toDTO(Address address){

        if(address == null){
            return null;
        }

        AddressDTO dto = new AddressDTO();

        dto.setCep(address.getCep());
        dto.setStreet(address.getStreet());
        dto.setNumber(address.getNumber());
        dto.setComplement(address.getComplement());
        dto.setCity(address.getCity());
        dto.setState(address.getState());

        return dto;
    }

    public static Address toEntity(AddressDTO dto){

        if(dto == null){
            return null;
        }

        Address address = new Address();

        address.setCep(dto.getCep());
        address.setStreet(dto.getStreet());
        address.setNumber(dto.getNumber());
        address.setComplement(dto.getComplement());
        address.setCity(dto.getCity());
        address.setState(dto.getState());

        return address;
    }
}