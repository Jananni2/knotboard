package com.example.demo.exception;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(StickyNoteNotFoundException.class){
        public ResponseEntity<Map<String,String>> handleNotFound(StickyNoteNotFoundException ex){
             
        }
    }
}
