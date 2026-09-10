package com.example.demo.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
// import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dto.BoardActivityDto;
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
    public ResponseEntity<BoardDto> createBoard(
            @RequestBody BoardCreateDto dto,
            @AuthenticationPrincipal AppUser user) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(boardService.createBoard(dto, user));
    }
 @GetMapping("/{boardId}/activities")
public ResponseEntity<Page<BoardActivityDto>> getActivities(
        @PathVariable Long boardId,
        Pageable pageable
) {
    return ResponseEntity.ok(
            boardService.getActivities(boardId, pageable)
    );
}
    @GetMapping
    public ResponseEntity<Page<BoardDto>> getActiveBoards(Pageable pageable) {

        return ResponseEntity.ok(boardService.getActiveBoards(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDto> getBoardById(@PathVariable Long id) {
  

        return ResponseEntity.ok(boardService.getBoardById(id));
    }
    

     @PutMapping("/{id}/settings")
public ResponseEntity<BoardDto> updateSettings(
        @PathVariable Long id,
        @RequestParam(required = false) Integer maxNoteCapacity,
        @RequestParam(required = false) String status,
        @AuthenticationPrincipal AppUser user) {

    return ResponseEntity.ok(
            boardService.updateBoardSettings(
                    id,
                    maxNoteCapacity,
                    status,
                    user
            )
    );
}
 
@DeleteMapping("/{id}")
public ResponseEntity<String> deleteBoard(@PathVariable Long id) {

     
    boardService.deleteBoard(id);

    return ResponseEntity.ok("Board deleted successfully");
}
}

