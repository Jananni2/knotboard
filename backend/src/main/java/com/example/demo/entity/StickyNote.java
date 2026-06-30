package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Version;

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
    @Column(name="color_code",nullable=false)
    private String colorCode;
    @Column(name = "x_pos",nullable = false)
    private Integer xPos;
    @Column(name = "y_pos",nullable =false)
    private Integer yPos;
    @Version(optimistic locking)
    private Long version;
    private LocalDateTime deletedAt;
    private LocalDateTime createdAt;

}
