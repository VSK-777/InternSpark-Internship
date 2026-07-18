package com.example.demo.controller;

import com.example.demo.dto.ConversationResponse;
import com.example.demo.security.UserDetailsImpl;
import com.example.demo.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
public class ConversationController {

    private final ConversationService conversationService;

    @GetMapping
    public ResponseEntity<List<ConversationResponse>> getConversations() {
        Long userId = getUserId();
        return ResponseEntity.ok(conversationService.getUserConversations(userId));
    }

    @PostMapping
    public ResponseEntity<ConversationResponse> createConversation(@RequestBody Map<String, String> body) {
        Long userId = getUserId();
        String title = body.getOrDefault("title", "New Chat");
        return ResponseEntity.ok(conversationService.createConversation(userId, title));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversationResponse> getConversation(@PathVariable Long id) {
        Long userId = getUserId();
        return ResponseEntity.ok(conversationService.getConversation(id, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConversation(@PathVariable Long id) {
        Long userId = getUserId();
        conversationService.deleteConversation(id, userId);
        return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
    }

    private Long getUserId() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getId();
    }
}
