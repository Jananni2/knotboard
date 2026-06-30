 package com.example.demo.repository;

import org.hibernate.query.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.BoardActivity;

public interface BoardActivityRepository extends JpaRepository<BoardActivity,Long> {
 Page<BrainstormingBoard>
    
 }