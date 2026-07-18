package com.example.demo.service;

import com.example.demo.entity.Message;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MockAiServiceImpl implements AiService {
    
    @Override
    public String generateResponse(List<Message> history, String newMessage) {
        try {
            Thread.sleep(1000); // Simulate network delay
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        return "I am a mock AI assistant. I heard you say: \"" + newMessage + "\".\n\n" +
               "This is a placeholder response. In a production environment, this would call OpenAI, Gemini, or another LLM provider.";
    }
}
