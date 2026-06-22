package com.example.demo.entity;

import org.hibernate.cache.spi.support.DomainDataRegionTemplate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "app_users")
public class AppUser {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 long Id;
 @Column(unique = true,nullable = false)
 String username;
 @Column(unique = true,nullable = false)
 String email;
 @Column()
 String password;
  
  
    
}