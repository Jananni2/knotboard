package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
 

@Entity
@Table(name = "boards")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardActitvity {
@Id
@GeneratedValue(strategy =GenerationType.IDENTITY)
private Long id;
@Column(nullable=false)
private String title;
private String description;
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name="facilitator_id")
private AppUser facilitator;
@Enumerated(EnumType.STRING)
private BoardStatus status;
@Column(name="max_note_capacity")
Integer maxNoteCapacity;
@Column(name="current_note_count")
Integer currentNoteCount;
@Column(name="created_at")
LocalDateTime createdAt;
public enum BoardStatus{
    ACTIVE,ARCHIVED
}
}