package com.example.demo.controller;

import java.time.LocalDateTime;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.NoteDto;
import com.example.demo.entity.AppUser;
import com.example.demo.entity.BoardActivity;
import com.example.demo.entity.BrainstormingBoard;
import com.example.demo.entity.StickyNote;
import com.example.demo.repository.BoardRepository;

import lombok.RequiredArgsConstructor;
@RestController
@RequiredArgsConstructor
public class NoteController {
    private BoardRepository boardRepository;
    @Transactional
public NoteDto editNote(NoteDto dto, AppUser creator) {

    if (creator.getDomainRole() == AppUser.DomainRole.STAKEHOLDER) {
        throw new RuntimeException("Stakeholders have view-only access and cannot add notes");
    }

    BrainstormingBoard board = boardRepository.findById(dto.getId())
            .orElseThrow(() -> new RuntimeException("Board not found"));

    if (board.getCurrentNoteCount() >= board.getMaxNoteCapacity()) {
        throw new RuntimeException("Board capacity reached");
    }

    StickyNote note = StickyNote.builder()
            .board(board)
            .creator(creator)
            .content(dto.getContent())
            .colorCode(dto.getColorCode())
            .xPos(dto.getX())
            .yPos(dto.getY())
            .build();

    StickyNote saved = noteRepository.save(note);

    board.setCurrentNoteCount(board.getCurrentNoteCount() + 1);
    boardRepository.save(board);

    String text = saved.getContent();
    if (text.length() > 20) {
        text = text.substring(0, 20);
    }

    BoardActivity activity = BoardActivity.builder()
            .board(board)
            .actor(creator)
            .actionDescription("Added a note: " + text)
            .timestamp(LocalDateTime.now())
            .build();

    boardActivityRepository.save(activity);

    return mapToDto(saved);
}
}
