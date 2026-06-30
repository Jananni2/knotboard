package com.example.demo.dto;

import lombok.Data;

@Data
public class BoardCreateDto {
private String title;
private String description;
private Integer maxCapacity;    
}