 package com.example.demo.repository;

import org.hibernate.query.Page;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.BoardActivity;
import com.example.demo.entity.BrainstormingBoard;

public interface BoardActivityRepository extends JpaRepository<BoardActivity,Long> {
 Page<BrainstormingBoard>findAllByStatus(BrainstormingBoard.BoardStatus status,Pageable pageable)
    
 }