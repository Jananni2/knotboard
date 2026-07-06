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

import com.example.demo.dto.AuthRequestDto;
import com.example.demo.dto.AuthResponseDto;
import com.example.demo.dto.RegisterRequestDto;
 
import com.example.demo.service.AuthService;

@RestController
@RequestMapping("api/auth")
public class AuthController {

@Autowired
private AuthService authService;

 

@PostMapping("/register")
public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterRequestDto request){
    AuthResponseDto response = authService.register(request);
    return ResponseEntity.ok(response);
}
@PostMapping("/login")
public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto request){
     AuthResponseDto response = authService.login(request);
     return ResponseEntity.ok(response);
}

 
}
