package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardCreateDto {
private String title;
private String description;
private Integer maxNoteCapacity;    
}