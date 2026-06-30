package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "sticky_notes")
public class StickyNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private BrainstormingBoard board;
    @ManyToOne
    private AppUser creator;
    @Column(columnDefinition = "TEXT",nullable=false)
    private String content;
    private String colorCode;
    private Integer xPos;
    private Integer yPos;
    private Long version;
    private LocalDateTime deletedAt;
    private LocalDateTime createdAt;

}
