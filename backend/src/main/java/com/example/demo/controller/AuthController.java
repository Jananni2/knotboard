package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
    
}