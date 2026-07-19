package com.example.demo.service;

import com.example.demo.entity.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final ChatClient.Builder chatClientBuilder;

    @Override
    public String generateResponse(List<Message> history, String newMessage) {
        ChatClient chatClient = chatClientBuilder.build();

        List<org.springframework.ai.chat.messages.Message> springAiMessages = new ArrayList<>();
        
        // Convert history
        for (Message msg : history) {
            if ("USER".equalsIgnoreCase(msg.getRole())) {
                springAiMessages.add(new UserMessage(msg.getContent()));
            } else {
                springAiMessages.add(new AssistantMessage(msg.getContent()));
            }
        }
        
        // Add new message
        springAiMessages.add(new UserMessage(newMessage));

        Prompt prompt = new Prompt(springAiMessages);

        try {
            return chatClient.prompt(prompt).call().content();
        } catch (Exception e) {
            return "Sorry, I am currently experiencing issues connecting to the AI service. Please try again later.";
        }
    }
}
