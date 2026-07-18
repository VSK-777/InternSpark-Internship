# Spring Boot Full Stack Demo Project

This is a complete full-stack project skeleton built with Java 21, Spring Boot 3.x, and React (Vite + TypeScript).

## Project Structure

```
.
├── backend/            # Spring Boot backend application
├── frontend/           # React + Vite frontend application
├── docker-compose.yml  # Docker Compose configuration
├── .env.example        # Example environment variables
└── README.md           # Project documentation
```

## Environment Variables

Copy `.env.example` to `.env` and configure the values:

```bash
cp .env.example .env
```

## Running Locally

### Backend (Maven)

Navigate to the `backend` directory and run:

```bash
cd backend
mvn spring-boot:run
```

### Frontend (npm)

Navigate to the `frontend` directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

## Running with Docker

Make sure you have Docker and Docker Compose installed.

To build and start all services (PostgreSQL, Backend, Frontend):

```bash
docker compose up --build
```

To stop the services:

```bash
docker compose down
```

## Future Development

* Implement domain models and database migrations.
* Add business logic and service implementations.
* Build out the REST API controllers.
* Develop the React frontend components and integrate with backend APIs.
