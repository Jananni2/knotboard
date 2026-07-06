package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.BoardCreateDto;
import com.example.demo.dto.BoardDto;
import com.example.demo.entity.AppUser;
import com.example.demo.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<BoardDto>createBoard(@RequestBody BoardCreateDto dto,@AuthenticationPrincipal AppUser user){
          return ResponseEntity.status(HttpStatus.CREATED)
          .body(boardService.createBoard(dto, user));
    }
}
