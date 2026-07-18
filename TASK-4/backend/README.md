# ⚙️ Backend - AI Chatbot Application

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen?style=for-the-badge&logo=spring-boot)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Security](https://img.shields.io/badge/Spring_Security-JWT-blue?style=for-the-badge)

## 🎯 Purpose
The backend serves as the secure, robust data processing engine and authentication gateway for the AI Chatbot application. It handles user management, session validation, and chat history persistence.

## 🏗️ Architecture
The system follows a strict Clean Architecture pattern:
1. **Security Layer:** Intercepts requests, validates JWT tokens, and manages user authorization.
2. **Controller Layer:** Handles incoming HTTP requests, REST routing, and JSON serialization.
3. **Service Layer:** Contains the core business logic, mapping Entities to DTOs.
4. **Repository Layer:** Interfaces with the H2 database using Spring Data JPA.

## 🛡️ Security & Best Practices
- **JWT Authentication:** Stateless token-based security ensures scalable and secure user sessions.
- **Global Exception Handling:** Prevents stack trace leakage and provides standardized API error responses.
- **CORS Configuration:** Explicitly configured to accept requests securely from the frontend origin.

## 📂 Folder Structure
```text
backend/
├── src/main/java/com/example/demo/
│   ├── config/         # Security and CORS Configs
│   ├── controller/     # REST Endpoints (Auth, Chat)
│   ├── dto/            # Data Transfer Objects
│   ├── entity/         # JPA Database Models (User, Message)
│   ├── exception/      # Custom Exceptions & Handlers
│   ├── repository/     # Database Interfaces
│   ├── security/       # JWT Filters and Utils
│   └── service/        # Business Logic Interfaces & Impls
├── src/main/resources/
│   └── application.yml # H2 Database and App Configs
└── pom.xml             # Maven dependencies
```

## ⚙️ Installation & Configuration
Ensure Java 21+ and Maven are installed. The application is configured to use an **H2 in-memory database** out of the box (`application.yml`), meaning zero database installation or credentials configuration is needed!

## 🚀 Running Locally
Run the application using the Maven wrapper:
```bash
mvn clean spring-boot:run
```

---
**Author:** VAJJHA SAI KRISHNA

## Deployment Status

- ✅ **TASK-4 Updated Successfully** 🚀
