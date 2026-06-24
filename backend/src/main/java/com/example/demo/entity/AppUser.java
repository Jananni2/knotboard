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
@NoArgsConstructor
@AllArgsConstructor
@Getter


@Table(name = "app_users")
public class AppUser {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private long Id;
 @Column(unique = true,nullable = false)
 private String username;
 @Column(unique = true,nullable = false)
 private String email;
 @Column(nullable = false)
 private String password;
 @Enumerated(EnumType.STRING)
 @Column(name="domain_role")
 private domainRole domainRole;
 

}