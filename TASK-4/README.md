# 🤖 TASK-4: AI Chatbot Application

![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Full Stack](https://img.shields.io/badge/Stack-Full_Stack-blue?style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.x-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-25-ED8B00?style=for-the-badge)
![Groq API](https://img.shields.io/badge/AI-Groq_API-f55036?style=for-the-badge)

## 📖 Project Overview
The **AI Chatbot Application** is a complete, production-ready full-stack web application designed to provide a ChatGPT-like experience. It features a beautiful modern frontend, a secure Spring Boot backend, and a robust Neon PostgreSQL database, powered by the Groq API (Llama 3.1 8b Instant) for lightning-fast AI responses.

## ✨ Features
- **Modern UI/UX:** A stunning, responsive interface built with Tailwind CSS, Recharts, and shadcn/ui.
- **Secure Backend:** Spring Boot 4.1.x API with JWT Authentication, Bucket4j rate limiting, Caffeine Cache, and OWASP HTML Sanitizer.
- **Real AI Integration:** Intelligent chat processing using Spring AI and the Groq API.
- **Robust Database:** Persistent chat history managed via Neon PostgreSQL and Flyway for seamless migrations.
- **Clean Architecture:** Strictly adheres to SOLID principles and REST API best practices.

## 🏗️ System Architecture

```mermaid
flowchart LR
    A["React 19 Frontend (Vercel)"] <-->|"JSON over HTTP"| B["Spring Boot 4.1.x API (Render)"]
    B <-->|"JPA / Hibernate"| C[("Neon PostgreSQL")]
    B <-->|"Spring AI"| D(("Groq API (Llama 3.1)"))
```

## 🛠️ Technology Stack
| Category | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS, Recharts, React Router DOM 7 |
| **Backend** | Java 25, Spring Boot 4.1.x, Spring Security, Spring AI, Spring Data JPA |
| **Database** | Neon PostgreSQL, Flyway |
| **AI Integration** | Groq API (Llama 3.1 8b Instant) |
| **Security** | JWT, Bucket4j, Caffeine Cache, OWASP HTML Sanitizer |
| **Deployment** | Vercel (Frontend), Render (Backend), Docker |

## 📂 Folder Structure
```text
TASK-4/
├── backend/            # Spring Boot Server (API & Security)
├── frontend/           # React Client Application (UI/UX)
└── README.md           # This documentation
```

## 🚀 Installation & Running

### 1. Running the Backend
Navigate to the `backend` folder and run the Spring Boot application:
```bash
cd backend
mvn clean spring-boot:run
```
*The backend runs on `http://localhost:8080`. Ensure you have configured your Neon PostgreSQL and Groq API credentials in `application.yml`.*

### 2. Running the Frontend
Navigate to the `frontend` folder, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start on `http://localhost:5173`.*

## 🔮 Future Improvements
- Add OAuth2 Social Login (Google, GitHub).
- Implement WebSockets for real-time streaming of AI responses.

## 🎓 Learning Outcomes
- Mastered advanced React 19 and React Router DOM 7 patterns.
- Integrated cutting-edge LLMs via Spring AI and the Groq API.
- Implemented robust stateless JWT authentication and Bucket4j rate limiting in Spring Boot 4.1.x.
- Followed Clean Architecture for highly maintainable and scalable code.

---
**Author:** VAJJHA SAI KRISHNA

## Deployment Status

- ✅ **TASK-4 Updated Successfully** 🚀
