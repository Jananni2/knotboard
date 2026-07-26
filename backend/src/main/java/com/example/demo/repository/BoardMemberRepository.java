package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.BoardMember;

@Repository
public interface BoardMemberRepository extends JpaRepository<BoardMember,Long>{
  Optional<BoardMember> findByBoardIdAndUserId(Long boardId,Long userId);
  @Modifying
@Query("DELETE FROM BoardMember bm WHERE bm.board.id = :boardId")
int deleteByBoardId(@Param("boardId") Long boardId);
}
