 package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.BoardActivity;

public interface BoardActivityRepository extends JpaRepository<BoardActivity,Long> {
 
    
 }