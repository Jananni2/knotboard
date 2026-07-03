package com.example.demo.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import java.util.List;
// import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AuthRequestDto;
import com.example.demo.dto.AuthResponseDto;
import com.example.demo.dto.RegisterRequestDto;
import com.example.demo.entity.AppUser;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final AppUserRepository appUserRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtutil;
  private final AuthenticationManager authenticationManager;

  public AuthResponseDto register(RegisterRequestDto request){
    AppUser user = AppUser.builder()
    .username(request.getUsername())
    .email(request.getEmail())
    .password(passwordEncoder.encode(request.getPassword()))
    .domainRole(AppUser.DomainRole.valueOf(request.getRole()))
    .build();

    AppUser savedUser = appUserRepository.save(user);

    String token = jwtutil.generateToken(savedUser);

    return AuthResponseDto.builder()
    .token(token)
    .username(savedUser.getUsername())
    .role(savedUser.getDomainRole().name())
    .build();

  }

  public AuthResponseDto login(AuthRequestDto request){
    
    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
    );

    AppUser user = appUserRepository
    .findByUsername(request.getUsername())
    .orElseThrow(()-> new RuntimeException("User not found"));

    String token = jwtutil.generateToken(user);

    return AuthResponseDto.builder()
    .token(token)
    .username(user.getUsername())
    .role(user.getDomainRole().name())
    .build();

  }

     
}
