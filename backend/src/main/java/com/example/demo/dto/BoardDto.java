package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardDto {
    private Long id;
    private String title;
    private String description;
    private String facilitatorName;
    private String status;
    private Integer maxNoteCapacity;
    private Integer currentNoteCount;
    private LocalDateTime createdAt;

}
