package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.BoardMember;

@Repository
public interface BoardMemberRepository extends JpaRepository<BoardMember,Long>{
  Optional<BoardMember> findByBoardIdAndUserId(Long boardId,Long userId);
}
