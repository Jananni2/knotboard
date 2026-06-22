package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "app_users")
public class AppUser {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 long Id;
 String username;
 String email;
 String password;
 @Enumerated(EnumType.STRING)
 Domain
    
}