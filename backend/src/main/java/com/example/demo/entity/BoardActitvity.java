package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "boards")
public class BoardActitvity {
@Id
@GeneratedValue(strategy =GenerationType.IDENTITY)
private Long id;
private String title;
private String description;
@Enumerated(EnumType.STRING)
BoardStatus status;
@Column(name="max_note_capacity")
Integer maxNoteCapacity;
Integer currentNoteCount;
LocalDateTime createdAt;
}