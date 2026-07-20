package com.example.demo.controller;

import com.example.demo.dto.MessageRequest;
import com.example.demo.dto.MessageResponse;
import com.example.demo.security.UserDetailsImpl;
import com.example.demo.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/{conversationId}")
    public ResponseEntity<List<MessageResponse>> getMessages(@PathVariable Long conversationId) {
        Long userId = getUserId();
        return ResponseEntity.ok(messageService.getMessages(conversationId, userId));
    }

    @PostMapping
    public ResponseEntity<MessageResponse> sendMessage(@Valid @RequestBody MessageRequest request) {
        Long userId = getUserId();
        return ResponseEntity.ok(messageService.sendMessage(userId, request));
    }

    @GetMapping("/test-ai-raw")
    public ResponseEntity<String> testAiRaw() {
        try {
            String apiKey = System.getenv("GROQ_API_KEY");
            if (apiKey == null || apiKey.isEmpty()) {
                return ResponseEntity.status(500).body("GROQ_API_KEY is not set in environment!");
            }
            
            java.net.http.HttpRequest req = java.net.http.HttpRequest.newBuilder()
                .uri(java.net.URI.create("https://api.groq.com/openai/v1/chat/completions"))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(java.net.http.HttpRequest.BodyPublishers.ofString(
                    "{\"model\": \"llama-3.1-8b-instant\", \"messages\": [{\"role\": \"user\", \"content\": \"Hello\"}]}"
                ))
                .build();
                
            java.net.http.HttpResponse<String> res = java.net.http.HttpClient.newHttpClient()
                .send(req, java.net.http.HttpResponse.BodyHandlers.ofString());
                
            return ResponseEntity.status(res.statusCode()).body(res.body());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Exception: " + e.getMessage());
        }
    }

    private Long getUserId() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getId();
    }
}
