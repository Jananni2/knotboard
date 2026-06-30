package com.example.demo.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.BoardActivity;

@Repository
public interface BoardActivityRepository extends JpaRepository<BoardActivity,Long>{
    Page<BoardActivity>findAllByBoardIdOrderByTimestampDesc(Long boardId,Pageable pageable);
}
