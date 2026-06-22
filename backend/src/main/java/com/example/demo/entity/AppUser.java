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

 public AppUser() {

}
 public AppUser(long id, String username, String email, String password, com.example.demo.entity.domainRole domainRole) {
    Id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.domainRole = domainRole;
}
 public String getUsername() {
    return username;
 }
 public void setUsername(String username) {
    this.username = username;
 }
 public String getEmail() {
    return email;
 }
 public void setEmail(String email) {
    this.email = email;
 }
 public String getPassword() {
    return password;
 }
 public void setPassword(String password) {
    this.password = password;
 }
 public domainRole getDomainRole() {
    return domainRole;
 }
 public void setDomainRole(domainRole domainRole) {
    this.domainRole = domainRole;
 }

}