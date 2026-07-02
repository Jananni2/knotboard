package com.example.demo.exception;

public class NoteConflictException extends RuntimeException{
    public NoteConflictException(String message){
        super(message);
    }
}
