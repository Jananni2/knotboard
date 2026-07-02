package com.example.demo.exception;


public class StickyNoteNotFoundException extends RuntimeException{
   public StickyNoteNotFoundException(String message){
    super(message);
   }
}
