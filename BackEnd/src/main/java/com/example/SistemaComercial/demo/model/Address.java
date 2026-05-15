package com.example.SistemaComercial.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;

    @Column(name = "cep")
    private String cep;

    @Column(name = "street")
    private String street;

    @Column(name = "number")
    private String number;

    @Column(name = "complement")
    private String complement;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @OneToMany(mappedBy = "address")
    private List<Supplier> suppliers;

    @OneToMany(mappedBy = "address")
    private List<Client> clients;
}
