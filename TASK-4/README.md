# 🤖 Spark AI: Enterprise AI Chatbot Platform

![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Full Stack](https://img.shields.io/badge/Stack-Full_Stack-blue?style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.4-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge)
![Groq API](https://img.shields.io/badge/AI-Groq_API-f55036?style=for-the-badge)

**[🔥 Live Demo](https://intern-spark-internship-task-4.vercel.app)**

## 📖 Project Overview
**Spark AI** (TASK-4) is a production-ready, highly polished full-stack web application that delivers a premium ChatGPT-like experience. Built with a stunning dark-mode-first React frontend and a secure Spring Boot 3.3.4 backend, the application connects to the ultra-fast Groq API (Llama 3.1) to generate intelligent responses with minimal latency.

## ✨ Premium Features
- **Enterprise UI/UX:** A stunning, fully responsive dark theme built with Tailwind CSS, Framer Motion, and shadcn/ui. Features glassmorphism, micro-animations, and perfect typography.
- **Robust Security:** Spring Boot API guarded by JWT Authentication, CORS protection, rate limiting, and global exception handling (no stack traces leak).
- **Intelligent AI Integration:** Powered by the Groq API (Llama 3.1 8B Instant) and integrated via Spring AI.
- **Reliable Data Persistence:** Neon Serverless PostgreSQL with Flyway database migrations for robust schema management.
- **Production Ready:** Fully configured for deployment on Render (Backend) and Vercel (Frontend).

## 🏗️ System Architecture

```mermaid
flowchart LR
    A["React 19 Frontend (Vercel)"] <-->|"REST API / JSON"| B["Spring Boot 3.3.4 API (Render)"]
    B <-->|"JPA / Hibernate"| C[("Neon PostgreSQL")]
    B <-->|"Spring AI"| D(("Groq API (Llama 3.1)"))
```

## 🛠️ Technology Stack
| Category | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Framer Motion, React Router DOM, TanStack Query |
| **Backend** | Java 21, Spring Boot 3.3.4, Spring Security, Spring AI, Spring Data JPA |
| **Database** | Neon PostgreSQL, Flyway |
| **AI Integration** | Groq API (Llama 3.1 8B Instant) |
| **Security** | JWT Auth, CORS Config, Global Exception Handling |
| **Deployment** | Vercel (Frontend), Render (Backend), Docker |

## 🚀 Local Development Setup

### 1. Backend Configuration
Navigate to the `backend` directory. Configure the following environment variables (or add them to `application.yml` / `application-prod.yml`):
- `DATABASE_URL`: Your Neon PostgreSQL JDBC URL
- `DATABASE_USERNAME` / `DATABASE_PASSWORD`: DB Credentials
- `GROQ_API_KEY`: Your Groq API key
- `JWT_SECRET`: A secure random string for signing tokens
- `FRONTEND_URL`: `http://localhost:5173` (for CORS)

Run the backend:
```bash
cd backend
mvn clean spring-boot:run
```

### 2. Frontend Configuration
Navigate to the `frontend` directory. Create a `.env` file with:
```env
VITE_API_URL=http://localhost:8080
```

Install dependencies and start the dev server:
```bash
cd frontend
npm install
npm run dev
```

## 🌍 Production Deployment Details
- **Backend (Render)**: The backend is containerized/built via Maven and deployed as a Web Service. Health checks are exposed at `/actuator/health` and bypassed by Spring Security.
- **Frontend (Vercel)**: Deployed with Vite build settings. Environment variables are set in the Vercel dashboard.
- **Database (Neon)**: Flyway automatically handles schema generation and migrations on startup.

## 🎓 Learning Outcomes
- Mastered building premium, animation-rich React user interfaces.
- Implemented robust Spring Boot architectures with strict security and exception boundaries.
- Seamlessly integrated third-party AI APIs (Groq) via Spring AI standard interfaces.
- Deployed a complex, multi-service application to the cloud with proper CORS and environment configuration.

---
**Author:** VAJJHA SAI KRISHNA

## Deployment Status
✅ **Spark AI - Production Release Completed** 🚀

- The AI Chatbot production timeout has been successfully resolved by fixing the Spring AI Groq API route configuration.

<!-- Deployment Timestamp: 2026-07-20 11:02:01 -->


## 🐳 Docker & Deployment Details

### Backend Dockerfile (`backend/Dockerfile`)
```dockerfile
# Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml ./
# Download dependencies (this layer will be cached unless pom.xml changes)
RUN mvn dependency:go-offline -B
COPY src ./src
# Build the application
RUN mvn clean package -DskipTests -B

# Run Stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

```

### Frontend Dockerfile (`frontend/Dockerfile`)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

```

### Docker Compose (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DATABASE_URL=jdbc:postgresql://postgres:5432/sparkai
      - DATABASE_USERNAME=postgres
      - DATABASE_PASSWORD=postgres
      - JWT_SECRET=your_super_secret_jwt_key_that_is_at_least_256_bits_long
      - GROQ_API_KEY=${GROQ_API_KEY}
      - FRONTEND_URL=http://localhost:5173
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=sparkai
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:

```

### Render Deployment Configuration (`render.yaml`)
```yaml
services:
  - type: web
    name: ai-chatbot-backend
    env: docker
    rootDir: TASK-4/backend
    dockerfilePath: Dockerfile
    plan: free
    region: ohio
    envVars:
      - key: SPRING_PROFILES_ACTIVE
        value: prod
      - key: DATABASE_URL
        sync: false
      - key: DATABASE_USERNAME
        sync: false
      - key: DATABASE_PASSWORD
        sync: false
      - key: GROQ_API_KEY
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: FRONTEND_URL
        sync: false

```
