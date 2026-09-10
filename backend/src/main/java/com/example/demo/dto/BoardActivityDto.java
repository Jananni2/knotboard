package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardActivityDto {

    private Long id;

    private String actorName;

    private String actionDescription;

    private LocalDateTime timestamp;
}