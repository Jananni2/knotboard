package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.StickyNote;

@Repository
public interface StickyNoteRepository extends JpaRepository<StickyNote,Long>{
    @Query("SELECT s FROM StickyNote s WHERE s.board.id = :boardId AND s.deletedAt IS NULL")
    List<StickyNote> findAllActiveByBoardId(Long boardId);

    Object countByDeletedAtIsNull();
}
