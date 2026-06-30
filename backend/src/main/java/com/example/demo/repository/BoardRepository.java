 package com.example.demo.repository;

 

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.BoardActivity;
import com.example.demo.entity.BrainstormingBoard;

public interface BoardRepository extends JpaRepository<BrainstormingBoard,Long> {
 Page<BrainstormingBoard>findAllByStatus(BrainstormingBoard.BoardStatus status,Pageable pageable)
    
 }