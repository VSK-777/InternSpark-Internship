# ⚙️ Backend - Employee CRUD Application

![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## 🎯 Purpose
The backend serves as the secure, robust data processing engine for the Employee application. It handles all business logic, data validation, and database persistence operations.

## 🏗️ Architecture
The system follows a strict, industry-standard 3-tier architecture:
1. **Controller Layer (`EmployeeController`):** Handles incoming HTTP requests, REST routing, and JSON serialization/deserialization.
2. **Service Layer (`EmployeeServiceImpl`):** Contains the core business logic, mapping Entities to DTOs, and transaction management.
3. **Repository Layer (`EmployeeRepository`):** Interfaces with the MySQL database using Spring Data JPA.

## 🛡️ Security & Best Practices
- **Global Exception Handling:** Uses `@ControllerAdvice` to intercept errors globally. This prevents generic 500 Server Errors from leaking stack traces or SQL syntax to the client.
- **CORS Configuration:** Explicitly configured to only accept requests from the frontend origin, preventing Cross-Site Request Forgery (CSRF) style attacks.
- **Transactional Integrity:** Data-modifying methods are marked with `@Transactional` to ensure atomic database commits.
- **Lombok Safety:** Avoiding the `@Data` anti-pattern on JPA Entities to prevent infinite recursion and memory leaks.

## 📂 Folder Structure
```text
backend/
├── src/main/java/com/internspark/employeeapi/
│   ├── config/         # Security and CORS Configs
│   ├── controller/     # REST Endpoints
│   ├── dto/            # Data Transfer Objects
│   ├── entity/         # JPA Database Models
│   ├── exception/      # Custom Exceptions & Handlers
│   ├── repository/     # Database Interfaces
│   └── service/        # Business Logic Interfaces & Impls
├── src/main/resources/
│   └── application.properties  # Database credentials
└── pom.xml             # Maven dependencies
```

## ⚙️ Installation & Configuration
1. Ensure Java 21+ and Maven are installed.
2. Configure your MySQL credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=your_password
```

## 🚀 Running Locally
Run the application using the Maven wrapper:
```bash
./mvnw clean spring-boot:run
```

## 🔮 Future Enhancements
- Implement DTO mapping libraries like MapStruct to reduce boilerplate code.
- Add Spring Security for token-based API authentication.
- Implement comprehensive Swagger/OpenAPI documentation.
