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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "boards")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BoardActitvity {
@Id
@GeneratedValue(strategy =GenerationType.IDENTITY)
private Long id;
private String title;
private String description;
private AppUser facilita
@Enumerated(EnumType.STRING)
BoardStatus status;
@Column(name="max_note_capacity")
Integer maxNoteCapacity;
Integer currentNoteCount;
LocalDateTime createdAt;
}