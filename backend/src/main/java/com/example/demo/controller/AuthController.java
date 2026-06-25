package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.AppUser;
import com.example.demo.service.AuthService;

@RestController
public class AuthController {
     @Autowired
private AuthService service;

@GetMapping("/get")
public List<AppUser> getUsers(){
    return service.getUsers();
}
@PostMapping("/api/auth/register")
public AppUser addUser(@RequestBody AppUser user){
    return service.addUser(user);
}
@DeleteMapping("/del/{id}")
public String delAcc(@PathVariable Long id){
    return service.delAcc(id);
}
}