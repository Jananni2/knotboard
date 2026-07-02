package com.example.demo.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(StickyNoteNotFoundException.class)
        public ResponseEntity<Map<String,String>> handleNotFound(StickyNoteNotFoundException ex){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("messege",ex.getMessage()));
        }
    @ExceptionHandler(NoteConflictException.class)
        public ResponseEntity<Map<String,String>> handleConflict(NoteConflictException ex){
            return ResponseEntity<Map<String,String>> handleRuntimeException(Runtime)
        }
    
    }
}
