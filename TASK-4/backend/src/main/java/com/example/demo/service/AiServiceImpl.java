package com.example.demo.service;

import com.example.demo.entity.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final ChatClient.Builder chatClientBuilder;

    @Override
    public String generateResponse(List<Message> history, String newMessage) {
        log.info("Generating AI response. History size: {}", history.size());
        ChatClient chatClient = chatClientBuilder.build();

        List<org.springframework.ai.chat.messages.Message> springAiMessages = new ArrayList<>();
        
        // Add System prompt
        springAiMessages.add(new SystemMessage("You are a helpful, intelligent AI assistant named Spark AI. Use markdown for formatting your responses. Be concise but extremely helpful."));
        
        // Convert history (the history already contains the newly saved user message at the end)
        for (Message msg : history) {
            if ("USER".equalsIgnoreCase(msg.getRole())) {
                springAiMessages.add(new UserMessage(msg.getContent()));
            } else {
                springAiMessages.add(new AssistantMessage(msg.getContent()));
            }
        }
        
        // We do not add `newMessage` again because `history` already contains it.
        // Doing so would cause a Groq 400 Bad Request error (two consecutive user messages).

        Prompt prompt = new Prompt(springAiMessages);

        try {
            log.info("Calling Groq API...");
            String response = chatClient.prompt(prompt).call().content();
            log.info("Successfully received AI response.");
            return response;
        } catch (Exception e) {
            log.error("Error generating AI response: {}", e.getMessage(), e);
            return "Sorry, I am currently experiencing issues connecting to the AI service. Please try again later. Error: " + e.getMessage();
        }
    }
}
