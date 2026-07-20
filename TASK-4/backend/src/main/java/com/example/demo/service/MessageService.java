package com.example.demo.service;

import com.example.demo.dto.MessageRequest;
import com.example.demo.dto.MessageResponse;
import com.example.demo.entity.Conversation;
import com.example.demo.entity.Message;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.ConversationRepository;
import com.example.demo.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final ConversationService conversationService;
    private final AiService aiService;

    @Transactional(readOnly = true)
    public List<MessageResponse> getMessages(Long conversationId, Long userId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));
        if (!conversation.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Conversation not found");
        }
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public MessageResponse sendMessage(Long userId, MessageRequest request) {
        PolicyFactory policy = Sanitizers.FORMATTING.and(Sanitizers.LINKS);
        String safeContent = policy.sanitize(request.getContent());

        Conversation conversation;
        if (request.getConversationId() == null) {
            String title = safeContent.length() > 30 ? safeContent.substring(0, 30) + "..." : safeContent;
            conversation = conversationRepository.findById(conversationService.createConversation(userId, title).getId()).get();
        } else {
            conversation = conversationRepository.findById(request.getConversationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));
            if (!conversation.getUser().getId().equals(userId)) {
                throw new ResourceNotFoundException("Conversation not found");
            }
        }

        // Save User Message
        Message userMessage = Message.builder()
                .conversation(conversation)
                .role("USER")
                .content(safeContent)
                .build();
        messageRepository.save(userMessage);

        // Get History and Generate AI Response
        List<Message> history = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversation.getId());
        String aiContent = aiService.generateResponse(history, request.getContent());

        // Save AI Message
        Message aiMessage = Message.builder()
                .conversation(conversation)
                .role("ASSISTANT")
                .content(aiContent)
                .build();
        aiMessage = messageRepository.save(aiMessage);

        return mapToResponse(aiMessage);
    }

    private MessageResponse mapToResponse(Message message) {
        return new MessageResponse(
                message.getId(),
                message.getConversation().getId(),
                message.getRole(),
                message.getContent(),
                message.getCreatedAt()
        );
    }
}
