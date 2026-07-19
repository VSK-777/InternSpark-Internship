# ⚙️ Backend - AI Chatbot Application

![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.x-brightgreen?style=for-the-badge&logo=spring-boot)
![Java](https://img.shields.io/badge/Java-25-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Security](https://img.shields.io/badge/Spring_Security-JWT-blue?style=for-the-badge)

## 🎯 Purpose
The backend serves as the secure, robust data processing engine and authentication gateway for the AI Chatbot application. It handles user management, session validation, chat history persistence, and orchestrates requests to the Groq API for intelligent responses.

## 🏗️ Architecture
The system follows a strict Clean Architecture pattern:
1. **Security Layer:** Intercepts requests, validates JWT tokens, applies Bucket4j rate limiting, and sanitizes input via OWASP HTML Sanitizer.
2. **Controller Layer:** Handles incoming HTTP requests, REST routing, and JSON serialization.
3. **Service Layer:** Contains the core business logic and orchestrates Llama 3.1 8b models using Spring AI.
4. **Repository Layer:** Interfaces with Neon PostgreSQL using Spring Data JPA and Flyway migrations.

## 🛡️ Security & Best Practices
- **JWT Authentication:** Stateless token-based security ensures scalable and secure user sessions.
- **Rate Limiting:** Bucket4j protects endpoints against DDoS and brute-force attacks.
- **Input Sanitization:** OWASP HTML Sanitizer prevents Cross-Site Scripting (XSS) vulnerabilities.
- **Performance:** Caffeine Cache ensures lightning-fast retrieval of frequently accessed data.

## 📂 Folder Structure
```text
backend/
├── src/main/java/com/example/demo/
│   ├── config/         # Security, CORS, Cache, and Rate Limit Configs
│   ├── controller/     # REST Endpoints (Auth, Chat)
│   ├── dto/            # Data Transfer Objects
│   ├── entity/         # JPA Database Models (User, Message)
│   ├── exception/      # Custom Exceptions & Handlers
│   ├── repository/     # Database Interfaces
│   ├── security/       # JWT Filters and Utils
│   └── service/        # Business Logic & Spring AI Integration
├── src/main/resources/
│   ├── db/migration/   # Flyway SQL scripts
│   └── application.yml # Database and Groq API Configs
└── pom.xml             # Maven dependencies
```

## ⚙️ Installation & Configuration
Ensure Java 25 and Maven are installed. Configure your Neon PostgreSQL and Groq API keys in `application.yml` before starting.

## 🚀 Running Locally
Run the application using the Maven wrapper:
```bash
mvn clean spring-boot:run
```

---
**Author:** VAJJHA SAI KRISHNA

## Deployment Status

- ✅ **TASK-4 Updated Successfully** 🚀
