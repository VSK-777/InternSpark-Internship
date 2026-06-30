# 🗄️ TASK-2: Database Migration using Flyway

![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen?style=for-the-badge)
![Flyway](https://img.shields.io/badge/Flyway-Database_Migration-red?style=for-the-badge)

## 📖 Project Overview
This project handles the automated database schema creation, versioning, and initial data seeding using **Flyway** and **Spring Boot**. 

Instead of manually running SQL scripts, this application automatically validates and applies the correct SQL scripts when it starts up, ensuring the database is always in the correct state.

## ✨ Features
- **Automated Schema Generation:** Automatically creates tables for Users and Tasks via V1 and V2 scripts.
- **Data Seeding:** Automatically inserts sample data (V3 script) so the application is ready to test immediately.
- **Version Control:** Flyway tracks which scripts have been executed, preventing duplicate executions.

## 🛠️ Technology Stack
- **Backend:** Java 21, Spring Boot 3.x
- **Database:** MySQL
- **Migration Tool:** Flyway
- **Dependencies:** Spring Data JPA, Lombok, Spring Web

## 📂 Folder Structure
```text
TASK-2/
├── database-migration/          # Spring Boot Application Root
│   ├── src/main/java/...        # Java Source Code (Controllers, Services, Repositories)
│   ├── src/main/resources/      # Application Configuration (application.yaml)
│   │   └── db/migration/        # Flyway SQL Migration Scripts (V1, V2, V3)
│   ├── pom.xml                  # Maven Dependencies Configuration
│   └── HELP.md                  # Project Command References
└── README.md                    # This documentation
```

## 🚀 Installation & Running

### 1. Database Setup
Ensure MySQL is running and create a local database named `task2_data_migration_db`:
```sql
CREATE DATABASE task2_data_migration_db;
```
*(Make sure your MySQL server is running on port 3306 with username `root` and password `root` as configured in `application.yaml`)*

### 2. Run the Application
Navigate to the `database-migration` folder and execute the Maven wrapper:
```bash
cd database-migration
./mvnw clean spring-boot:run
```
Upon startup, Flyway will automatically detect the SQL files in `src/main/resources/db/migration/` and execute them in chronological order (V1, V2, V3). 

### 3. Run Automated Tests
To verify that the database context loads and migrations are successful without starting the web server, run:
```bash
cd database-migration
./mvnw clean test
```

## 🔮 Future Improvements
- Implement foreign key relationships between Users and Tasks to ensure referential integrity.
- Add advanced Flyway callbacks (e.g., `afterMigrate.sql`) for complex database orchestration and seeding conditionally based on environment.
- Introduce integration testing with Testcontainers to validate migrations against a real MySQL Docker container during CI/CD pipelines.
- Add Spring Security to protect REST endpoints interacting with the migrated tables.

## 🎓 Learning Outcomes
- Mastered database version control using Flyway.
- Learned to automatically apply schema and data scripts on application startup.

---
**Author:** VAJJHA SAI KRISHNA
