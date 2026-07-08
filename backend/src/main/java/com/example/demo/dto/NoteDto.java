package com.example.demo.dto;
// import java.time.LocalDateTime;

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
    private Long boardId;
    private Long creatorId;
    private String content;
    private String colorCode;
    private Integer x;
    private Integer y;
    private Long version;
    
}
