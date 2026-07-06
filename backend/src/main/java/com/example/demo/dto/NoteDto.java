package com.example.demo.dto;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoteDto {
    private Long id;
    private Long ;
    private String description;
    private String facilitatorName;
    private String status;
    private Integer maxNoteCapacity;
    private Integer currentNoteCount;
    private LocalDateTime createdAt;
}
