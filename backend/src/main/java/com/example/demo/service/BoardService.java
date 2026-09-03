package com.example.demo.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.BoardCreateDto;
import com.example.demo.dto.BoardDto;
import com.example.demo.entity.AppUser;
import com.example.demo.entity.BoardActivity;
import com.example.demo.entity.BoardMember;
import com.example.demo.entity.BrainstormingBoard;
import com.example.demo.repository.BoardActivityRepository;
import com.example.demo.repository.BoardMemberRepository;
import com.example.demo.repository.BoardRepository;

 
import lombok.RequiredArgsConstructor;

 @Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardMemberRepository boardMemberRepository;
    private final BoardActivityRepository boardActivityRepository;

    @Transactional
    public BoardDto createBoard(BoardCreateDto dto, AppUser facilitator) {

        BrainstormingBoard board = BrainstormingBoard.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .facilitator(facilitator)
                .status(BrainstormingBoard.BoardStatus.ACTIVE)
                .maxNoteCapacity(dto.getMaxCapacity() == null ? 50 : dto.getMaxCapacity())
                .currentNoteCount(0)
                .createdAt(LocalDateTime.now())
                .build();

        BrainstormingBoard savedBoard = boardRepository.save(board);

        BoardMember member = BoardMember.builder()
                .board(savedBoard)
                .user(facilitator)
                .accessLevel("OWNER")
                .build();

        boardMemberRepository.save(member);

        BoardActivity activity = BoardActivity.builder()
                .board(savedBoard)
                .actor(facilitator)
                .actionDescription("Board created")
                .timestamp(LocalDateTime.now())
                .build();

        boardActivityRepository.save(activity);

        return mapToDto(savedBoard);
    }

    @Transactional(readOnly = true)
    public Page<BoardDto> getActiveBoards(Pageable pageable) {
        return boardRepository
                .findAllByStatus(BrainstormingBoard.BoardStatus.ACTIVE, pageable)
                .map(this::mapToDto);
    }

    @Transactional(readOnly = true)
    public BoardDto getBoardById(Long id) {

        BrainstormingBoard board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        return mapToDto(board);
    }

    @Transactional
    public BoardDto updateBoardSettings(Long id,
                                        Integer maxNoteCapacity,
                                        String status,
                                        AppUser actor) {

        BrainstormingBoard board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        if (board.getFacilitator().getId() != actor.getId()) {
            throw new RuntimeException("Only the facilitator can update board settings");
        }

        if (maxNoteCapacity != null) {

            if (maxNoteCapacity < board.getCurrentNoteCount()) {
                throw new RuntimeException(
                        "Cannot decrease capacity below current note count (" +
                                board.getCurrentNoteCount() + ")");
            }

            board.setMaxNoteCapacity(maxNoteCapacity);
        }

        if (status != null) {
            board.setStatus(BrainstormingBoard.BoardStatus.valueOf(status));
        }

        BrainstormingBoard updated = boardRepository.save(board);

        return mapToDto(updated);
    }

private BoardDto mapToDto(BrainstormingBoard board) {
    return BoardDto.builder()
            .id(board.getId())
            .title(board.getTitle())
            .description(board.getDescription())
            .facilitatorName(board.getFacilitator().getUsername())
            .status(board.getStatus().name())
            .maxNoteCapacity(board.getMaxNoteCapacity())
            .currentNoteCount(board.getCurrentNoteCount())
            .createdAt(board.getCreatedAt())
            .build();
}

  @Transactional
public void deleteBoard(Long id) {

    System.out.println("========== DELETE BOARD START ==========");

    System.out.println("Board ID: " + id);

    BrainstormingBoard board = boardRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Board not found"));

    System.out.println("Board found: " + board.getId());

    int activitiesDeleted =
            boardActivityRepository.deleteByBoardId(id);

    System.out.println(
            "Activities deleted: " + activitiesDeleted);

    int membersDeleted =
            boardMemberRepository.deleteByBoardId(id);

    System.out.println(
            "Members deleted: " + membersDeleted);

    boardActivityRepository.flush();
    boardMemberRepository.flush();

    System.out.println("Deleting board now...");

    boardRepository.deleteById(id);

    System.out.println("========== DELETE BOARD END ==========");
}

}