 package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.NoteDto;
import com.example.demo.entity.AppUser;
import com.example.demo.entity.AppUser.DomainRole;
import com.example.demo.entity.BoardActivity;
import com.example.demo.entity.BrainstormingBoard;
import com.example.demo.entity.StickyNote;
import com.example.demo.repository.BoardActivityRepository;
import com.example.demo.repository.BoardRepository;
import com.example.demo.repository.StickyNoteRepository;

import lombok.RequiredArgsConstructor;
import com.example.demo.exception.StickyNoteNotFoundException;
@Service
@RequiredArgsConstructor
public class NoteService {

    private final StickyNoteRepository noteRepository;
    private final BoardRepository boardRepository;
    private final BoardActivityRepository boardActivityRepository;
 @Transactional
public NoteDto addNote(NoteDto dto, AppUser user) {

    if (user.getDomainRole() == DomainRole.STAKEHOLDER) {
        throw new RuntimeException("Stakeholders cannot add notes");
    }

    // Lock this board row until the transaction finishes
    BrainstormingBoard board = boardRepository
            .findByIdForUpdate(dto.getBoardId())
            .orElseThrow(() -> new RuntimeException("Board not found"));

    int currentCount = board.getCurrentNoteCount() == null
            ? 0
            : board.getCurrentNoteCount();

    int maxCapacity = board.getMaxNoteCapacity() == null
            ? 0
            : board.getMaxNoteCapacity();

    if (currentCount >= maxCapacity) {
        throw new RuntimeException("Board capacity reached");
    }

    StickyNote note = StickyNote.builder()
            .board(board)
            .creator(user)
            .content(dto.getContent())
            .colorCode(dto.getColorCode())
            .xPos(dto.getX())
            .yPos(dto.getY())
            .createdAt(LocalDateTime.now())
            .build();

    note = noteRepository.save(note);

    board.setCurrentNoteCount(currentCount + 1);
    boardRepository.save(board);

    String text = dto.getContent();

    if (text.length() > 20) {
        text = text.substring(0, 20) + "...";
    }

    logActivity(
            board,
            user,
            "Added a note: " + text
    );

    return mapToDto(note);
}
    @Transactional(readOnly = true)
    public List<NoteDto> getActiveNotesByBoard(Long boardId) {

        return noteRepository.findAllActiveByBoardId(boardId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public NoteDto updateNotePosition(Long id, NoteDto dto, AppUser user) {

        if (user.getDomainRole() == DomainRole.STAKEHOLDER) {
            throw new RuntimeException("Stakeholders cannot move notes");
        }

         StickyNote note = noteRepository.findById(id)
         .orElseThrow(() -> new StickyNoteNotFoundException("Note not found"));

        note.setXPos(dto.getX());
        note.setYPos(dto.getY());

        note = noteRepository.save(note);

        return mapToDto(note);
    }

    @Transactional
    public NoteDto updateNoteContent(Long id, NoteDto dto, AppUser user) {

        if (user.getDomainRole() == DomainRole.STAKEHOLDER) {
            throw new RuntimeException("Stakeholders cannot edit notes");
        }

        StickyNote note = noteRepository.findById(id)
                .orElseThrow(() -> new StickyNoteNotFoundException("Note not found"));

        note.setContent(dto.getContent());

        note = noteRepository.save(note);

        logActivity(note.getBoard(), user, "Updated note content");

        return mapToDto(note);
    }

    @Transactional
    public void softDeleteNote(Long id, AppUser user) {

        if (user.getDomainRole() == DomainRole.STAKEHOLDER) {
            throw new RuntimeException("Stakeholders cannot delete notes");
        }

        StickyNote note = noteRepository.findById(id)
                 .orElseThrow(() -> new StickyNoteNotFoundException("Note not found"));

        if (note.getDeletedAt() != null) {
            return;
        }

        note.setDeletedAt(LocalDateTime.now());
        noteRepository.save(note);

        BrainstormingBoard board = note.getBoard();

        board.setCurrentNoteCount(board.getCurrentNoteCount() - 1);
        boardRepository.save(board);

        logActivity(board, user, "Deleted a note");
    }

    @Transactional
    public void undoDeleteNote(Long id, AppUser user) {

        if (user.getDomainRole() == DomainRole.STAKEHOLDER) {
            throw new RuntimeException("Stakeholders cannot restore notes");
        }

        StickyNote note = noteRepository.findById(id)
                 .orElseThrow(() -> new StickyNoteNotFoundException("Note not found"));

        if (note.getDeletedAt() == null) {
            return;
        }

        BrainstormingBoard board = note.getBoard();

        if (board.getCurrentNoteCount() >= board.getMaxNoteCapacity()) {
            throw new RuntimeException("Board capacity reached");
        }

        note.setDeletedAt(null);
        noteRepository.save(note);

        board.setCurrentNoteCount(board.getCurrentNoteCount() + 1);
        boardRepository.save(board);

        logActivity(board, user, "Restored a note");
    }

    private NoteDto mapToDto(StickyNote note) {

        return NoteDto.builder()
                .id(note.getId())
                .boardId(note.getBoard().getId())
                .creatorId(note.getCreator().getId())
                .content(note.getContent())
                .colorCode(note.getColorCode())
                .x(note.getXPos())
                .y(note.getYPos())
                .version(note.getVersion())
                .build();
    }

    private void logActivity(BrainstormingBoard board, AppUser actor, String action) {

        BoardActivity activity = BoardActivity.builder()
                .board(board)
                .actor(actor)
                .actionDescription(action)
                .timestamp(LocalDateTime.now())
                .build();

        boardActivityRepository.save(activity);
    }
}