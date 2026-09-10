 package com.example.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.StickyNote;
import com.example.demo.repository.StickyNoteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final StickyNoteRepository noteRepository;

    @Transactional(readOnly = true)
    public Map<String, Object> getBoardPulse(Long boardId) {

        List<StickyNote> notes = noteRepository.findAllActiveByBoardId(boardId);

        Map<String, Long> colorDistribution =
                notes.stream()
                        .collect(Collectors.groupingBy(
                                StickyNote::getColorCode,
                                Collectors.counting()));

        long uniqueContributors =
                notes.stream()
                        .map(n -> n.getCreator().getId())
                        .distinct()
                        .count();

        Map<String, Object> result = new HashMap<>();

        result.put("totalActiveNotes", notes.size());
        result.put("colorBreakdown", colorDistribution);
        result.put("uniqueContributors", uniqueContributors);

        return result;
    }

    // @Transactional(readOnly = true)
    // public Map<String, Object> getGlobalStats() {

    //     Map<String, Object> result = new HashMap<>();

    //     result.put("TotalNotes", noteRepository.count());
    //     result.put("activeNotes", noteRepository.countByDeletedAtIsNull());

    //     return result;
    // }
}