package com.example.demo.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.BoardActivity;

@Repository
public interface BoardActivityRepository extends JpaRepository<BoardActivity,Long>{
    Page<BoardActivity>findAllByBoardIdOrderByTimestampDesc(Long boardId,Pageable pageable);
      @Modifying
    @Query("DELETE FROM BoardActivity a WHERE a.board.id = :boardId")
    int deleteByBoardId(@Param("boardId") Long boardId);
}
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT b FROM BrainstormingBoard b WHERE b.id = :id")
Optional<BrainstormingBoard> findByIdForUpdate(@Param("id") Long id);