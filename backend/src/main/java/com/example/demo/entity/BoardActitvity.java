package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "boards")
public class BoardActitvity {
@Id
@GenertedValue(strategy =GenerationType.IDENTITY)
private Long id;
private String title;

    
}