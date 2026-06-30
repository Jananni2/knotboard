package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sticky_notes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StickyNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id",nullable = false)
    private BrainstormingBoard board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id",nullable = false)
    private AppUser creator;

    @Column(columnDefinition = "TEXT",nullable=false)
    private String content;

    @Column(name="color_code",nullable=false)
    private String colorCode;

    @Column(name = "x_pos",nullable = false)
    private Integer xPos;

    @Column(name = "y_pos",nullable =false)
    private Integer yPos;

    @Version
    private Long version;

    @Column(name="deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
