 package com.example.demo.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.AppUser;
import com.example.demo.service.AnalyticsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/insights")
@RequiredArgsConstructor
public class InsightController {

    private final AnalyticsService analyticsService;

    @GetMapping("/board/{id}")
    public ResponseEntity<Map<String, Object>> getBoardInsights(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                analyticsService.getBoardPulse(id));
    }

    @GetMapping("/workspace/stats")
    public ResponseEntity<Map<String, Object>> getWorkspaceStats(
            @AuthenticationPrincipal AppUser user) {

        return ResponseEntity.ok(
                analyticsService.getGlobalStats());
    }
}