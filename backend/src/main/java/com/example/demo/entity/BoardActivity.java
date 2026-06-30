package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "board_activities")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = )
    private BrainstormingBoard board;

    @ManyToOne
    private AppUser actor;
    
    @Column(name="action_description")
    private String actionDescription;

    @Column(name="timestamp")
    private LocalDateTime timestamp;
}
