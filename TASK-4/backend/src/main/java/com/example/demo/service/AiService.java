package com.example.demo.service;

import java.util.List;
import com.example.demo.entity.Message;

public interface AiService {
    String generateResponse(List<Message> history, String newMessage);
}
