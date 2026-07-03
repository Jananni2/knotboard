package com.example.demo.service;

// import java.util.List;
// import java.util.Optional;

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

    public AppUser addUser(AppUser user) {
        return repo.save(user);
    }

    public AppUser loginUser(AppUser user) {
        return repo.save(user);
    }

    public String delAcc(Long id) {
         repo.deleteById(id);
         return "User deleted successfully";
    }

    public AppUser updatAppUser(Long id, AppUser user) {
      Optional<AppUser> u = repo.findById(id);
      if(u.isPresent()){

      }
    }

     
}
