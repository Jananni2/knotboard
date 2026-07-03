package com.example.demo.service;

// import java.util.List;
// import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.util.JwtUtil;

@Service
public class AuthService {
  private final AppUserRepository appUserRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtutil;
  

     
}
