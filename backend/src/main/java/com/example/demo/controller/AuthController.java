package com.example.demo.controller;
// import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthResponseDto;
import com.example.demo.dto.RegisterRequestDto;
import com.example.demo.entity.AppUser;
import com.example.demo.service.AuthService;

@RestController
@RequestMapping("api/auth")
public class AuthController {

@Autowired
private AuthService service;

// @GetMapping("/get")
// public List<AppUser> getUsers(){
//     return service.getUsers();
// }

@PostMapping("/register")
public AppUser addUser(@RequestBody RegisterRequestDto user){
    return ResponseEntity<AuthResponseDto>register()
}

@PostMapping("/api/auth/login")
public AppUser loginUser(@RequestBody AppUser user){
    return service.loginUser(user);
}

// @DeleteMapping("/del/{id}")
// public String delAcc(@PathVariable Long id){
//     return service.delAcc(id);
// }
// @PutMapping("/update/{id}")
// public AppUser updatAppUser(@PathVariable Long id,@RequestBody AppUser user){
//     return service.updatAppUser(id,user);
// }
}
