package com.example.demo.controller;
import java.util.List;
import org.springframework.http.ResponseEntity;
 import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.NoteDto;
import com.example.demo.entity.AppUser;
 
import com.example.demo.service.NoteService;

import lombok.RequiredArgsConstructor;
 @RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public ResponseEntity<NoteDto> addNote(
            @RequestBody NoteDto dto,
            @AuthenticationPrincipal AppUser user) { }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<NoteDto>> getNotes(
            @PathVariable Long boardId) { }

    @PutMapping("/{id}/move")
    public ResponseEntity<NoteDto> moveNote(
            @PathVariable Long id,
            @RequestBody NoteDto dto,
            @AuthenticationPrincipal AppUser user) { }

    @PutMapping("/{id}/content")
    public ResponseEntity<NoteDto> updateContent(
            @PathVariable Long id,
            @RequestBody NoteDto dto,
            @AuthenticationPrincipal AppUser user) { }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNote(
            @PathVariable Long id,
            @AuthenticationPrincipal AppUser user) { }

    @PostMapping("/{id}/undo")
    public ResponseEntity<Void> undoDelete(
            @PathVariable Long id,
            @AuthenticationPrincipal AppUser user) { }
}


