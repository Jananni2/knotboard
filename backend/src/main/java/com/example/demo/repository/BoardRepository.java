 package com.example.demo.repository;

 

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.BrainstormingBoard;
 import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;
import org.springframework.data.repository.query.Param;

@Repository
public interface BoardRepository extends JpaRepository<BrainstormingBoard,Long> {
 Page<BrainstormingBoard>findAllByStatus(BrainstormingBoard.BoardStatus status,Pageable pageable);
  @Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT b FROM BrainstormingBoard b WHERE b.id = :id")
Optional<BrainstormingBoard> findByIdForUpdate(@Param("id") Long id);  
 }
 
 