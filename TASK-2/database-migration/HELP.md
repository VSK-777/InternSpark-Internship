# 🗄️ Database Migration Help

## Project Context
This Spring Boot application is built specifically for **TASK-2** of the InternSpark Internship. It focuses on Database Migrations using Flyway.

The primary objective is to manage the database schema (Tables: Users, Tasks) automatically using versioned SQL scripts located in `src/main/resources/db/migration`. 

## How it works:
1. When the application starts up, Flyway intercepts the database connection.
2. It looks for a `flyway_schema_history` table. If it doesn't exist, it creates it.
3. It scans the `db/migration` folder and executes `V1__...`, `V2__...`, `V3__...` in chronological order.
4. If a script has already been executed successfully in the past, Flyway safely skips it!

## Useful Commands
* **Run Tests:** `.\mvnw clean test` (Verifies context loads and migrations execute correctly)
* **Start Application:** `.\mvnw clean spring-boot:run`
