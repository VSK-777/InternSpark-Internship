# 🗄️ TASK-2: Database Migration using Flyway

![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.0-brightgreen?style=for-the-badge)
![Flyway](https://img.shields.io/badge/Flyway-Database_Migration-red?style=for-the-badge)

## 📖 Project Overview
This project handles the automated database schema creation, versioning, and initial data seeding using **Flyway** and **Spring Boot**. 

Instead of manually running SQL scripts, this application automatically validates and applies the correct SQL scripts when it starts up, ensuring the database is always in the correct state.

## 🎯 Objective
The objective of this project is to demonstrate database version control using Flyway with Spring Boot. Database schema creation, updates, and initial data insertion are handled automatically through versioned SQL migration scripts, eliminating manual database setup.

## ✨ Features
- **Automated Schema Generation:** Automatically creates tables for Users and Tasks via V1 and V2 scripts.
- **Data Seeding:** Automatically inserts sample data (V3 script) so the application is ready to test immediately.
- **Version Control:** Flyway tracks which scripts have been executed, preventing duplicate executions.

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Backend** | Java 21, Spring Boot 4.1.0 |
| **Database** | MySQL |
| **Migration Tool** | Flyway |
| **Dependencies** | Spring Data JPA, Lombok, Spring Web |

## 📜 Migration Scripts

| Version | Description |
|----------|-------------|
| V1 | Create Users table |
| V2 | Create Tasks table |
| V3 | Insert sample records |

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

## 📋 Prerequisites

- Java 21
- Maven
- MySQL 8+
- Git

## 🚀 Installation & Running

### 1. Database Setup
Ensure MySQL is running and create a local database named `task2_data_migration_db`:
```sql
CREATE DATABASE task2_data_migration_db;
```

Flyway automatically creates a table named `flyway_schema_history` to record executed migrations. During startup, it validates the existing database state and executes only the pending migration scripts, ensuring each migration runs exactly once.

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

## ⚙️ Flyway Migration Workflow

```text
Application Starts
        │
        ▼
Flyway Checks flyway_schema_history
        │
        ▼
Pending SQL Scripts Found?
        │
   Yes ─────► Execute V1 → V2 → V3
        │
        ▼
Database Ready
```

## 🖥️ Sample Startup Output

```text
Flyway Community Edition
Successfully validated 3 migrations
Migrating schema...
Successfully applied 3 migrations
Started DatabaseMigrationApplication
```

## 🎓 Learning Outcomes

- Gained practical experience with database version control using Flyway.
- Implemented automated database schema migrations using versioned SQL scripts.
- Automated initial database data seeding during application startup.
- Understood how Flyway validates and tracks migrations using the `flyway_schema_history` table.
- Learned how Spring Boot integrates with Flyway for seamless database initialization.

## 📄 License

This project was developed as part of the InternSpark Java Internship Program for educational purposes.

---
**Author:** VAJJHA SAI KRISHNA

## Deployment Status

- ✅ **TASK-2 Updated Successfully** 🚀

