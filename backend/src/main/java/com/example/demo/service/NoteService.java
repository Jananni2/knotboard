package com.example.demo.service;

import java.time.LocalDateTime;

import com.example.demo.dto.NoteDto;
import com.example.demo.entity.AppUser;
import com.example.demo.entity.AppUser.DomainRole;
import com.example.demo.repository.BoardRepository;
import com.example.demo.entity.BrainstormingBoard;
import com.example.demo.entity.StickyNote;

import jakarta.transaction.Transactional;

public class NoteService {
    @Transactional
public NoteDto addNote(NoteDto dto, AppUser creator) {

    if (creator.getDomainRole() == DomainRole.STAKEHOLDER) {
        throw new RuntimeException("Stakeholders have view-only access and cannot add notes");
    }

    final BoardRepository boardRepository;
        BrainstormingBoard board = boardRepository.findById(dto.getBoardId())
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
            .createdAt(LocalDateTime.now())
            .build();

    noteRepository.save(note);

    board.setCurrentNoteCount(board.getCurrentNoteCount() + 1);
    boardRepository.save(board);

    String text = dto.getContent();
    if (text.length() > 20)
        text = text.substring(0, 20) + "...";

    activityService.logActivity(board, creator, "Added a note: " + text);

    return mapToDto(note);
}
}
