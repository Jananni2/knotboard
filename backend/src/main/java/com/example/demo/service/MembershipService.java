 package com.example.demo.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.AppUser;
import com.example.demo.entity.BoardActivity;
import com.example.demo.entity.BoardMember;
import com.example.demo.entity.BrainstormingBoard;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.repository.BoardActivityRepository;
import com.example.demo.repository.BoardMemberRepository;
import com.example.demo.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final BoardRepository boardRepository;
    private final AppUserRepository appUserRepository;
    private final BoardMemberRepository boardMemberRepository;
    private final BoardActivityRepository boardActivityRepository;

    @Transactional
    public void enrollContributor(Long boardId, Long userId, AppUser facilitator) {

        BrainstormingBoard board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        if (board.getStatus() == BrainstormingBoard.BoardStatus.ARCHIVED) {
            throw new RuntimeException("Cannot add members to an archived board");
        }

        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User to enroll not found"));

        if (boardMemberRepository.findByBoardIdAndUserId(boardId, userId).isPresent()) {
            throw new RuntimeException("User is already a member of this board");
        }

        BoardMember member = BoardMember.builder()
                .board(board)
                .user(user)
                .accessLevel("CONTRIBUTOR")
                .joinedAt(LocalDateTime.now())
                .build();

        boardMemberRepository.save(member);

        BoardActivity activity = BoardActivity.builder()
                .board(board)
                .actor(facilitator)
                .actionDescription("Enrolled user: " + user.getUsername())
                .timestamp(LocalDateTime.now())
                .build();

        boardActivityRepository.save(activity);
    }
}