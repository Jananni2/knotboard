package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = )
public class BoardActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private BrainstormingBoard board;

    @ManyToOne
    private AppUser actor;
    
    @Column(name="action_description")
    private String actionDescription;

    @Column(name="timestamp")
    private LocalDateTime timestamp;
}
