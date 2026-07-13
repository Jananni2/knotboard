 package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.AppUser;
import com.example.demo.service.MembershipService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MembershipService membershipService;

    @PostMapping("/invite")
    public ResponseEntity<Void> inviteMember(
            @RequestParam Long boardId,
            @RequestParam Long userId,
            @AuthenticationPrincipal AppUser facilitator) {

        membershipService.enrollContributor(boardId, userId, facilitator);

        return ResponseEntity.ok().build();
    }
}