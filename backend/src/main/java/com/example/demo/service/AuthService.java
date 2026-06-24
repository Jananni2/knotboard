package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.controller.AppUser;
import com.example.demo.controller.List;
import com.example.demo.repository.AppUserRepository;

@Service
public class AuthService {
    @Autowired
    private AppUserRepository repo;

    public List<AppUser> getUsers() {
        return repo.findAll();
    }
}
