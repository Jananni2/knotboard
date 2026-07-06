package com.example.demo.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.demo.dto.BoardCreateDto;
import com.example.demo.dto.BoardDto;
import com.example.demo.entity.AppUser;
import com.example.demo.entity.BoardActivity;
import com.example.demo.entity.BoardMember;
import com.example.demo.entity.BrainstormingBoard;
import com.example.demo.repository.BoardActivityRepository;
import com.example.demo.repository.BoardMemberRepository;
import com.example.demo.repository.BoardRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService{
   
  private final BoardRepository boardRepository;
  private final BoardMemberRepository memberRepository;
  private final BoardActivityRepository boardActivityRepository;
    @Transactional
      public BoardDto createBoard(BoardCreateDto dto,AppUser facilitator){
        BrainstormingBoard board = BrainstormingBoard.builder()
        .title(dto.getTitle())
        .description(dto.getDescription())
        .facilitator(facilitator)
        .status(BrainstormingBoard.BoardStatus.ACTIVE)
        .maxNoteCapacity(dto.getMaxCapacity())
        .currentNoteCount(0)
        .createdAt(LocalDateTime.now())
        .build();

        board = boardRepository.save(board);

        BoardMember member = BoardMember.builder()
        .board(board)
        .user(facilitator)
        .accessLevel("OWNER")
        .joinedAt(LocalDateTime.now())
        .build();
        
        memberRepository.save(member);

        BoardActivity boardActivity = BoardActivity.builder()
                                     .board(board)
                                      .actor(facilitator)
                                      .actionDescription("Board created")
                                      .timestamp(LocalDateTime.now())
                                      .build();
        
        boardActivityRepository.save(boardActivity);

        // return boardMapp
        
    
      }
    
}
