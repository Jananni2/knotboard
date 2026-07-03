package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.BoardCreateDto;
import com.example.demo.dto.BoardDto;
import com.example.demo.entity.AppUser;
import com.example.demo.entity.BrainstormingBoard;

import jakarta.transaction.Transactional;

@Service
public class BoardService{
    @Transactional
      public BoardDto createBoard(BoardCreateDto dto,AppUser facilitator){
        BrainstormingBoard board = BrainstormingBoard.builder()
        .
      }
    
}
