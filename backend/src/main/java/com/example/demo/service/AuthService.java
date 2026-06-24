package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.AppUser;
import com.example.demo.repository.AppUserRepository;

@Service
public class AuthService {
    @Autowired
    private AppUserRepository repo;

    public List<AppUser> getUsers() {
        return repo.findAll();
    }

    public AppUser addUser() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addUser'");
    }
}
