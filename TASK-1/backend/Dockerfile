# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package the application (skip tests for faster production deployment)
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the generated JAR from the build stage
COPY --from=build /app/target/employee-api-0.0.1-SNAPSHOT.jar app.jar

# Render injects the PORT environment variable natively.
# We expose a default port for local Docker runs if needed.
EXPOSE 8080

# Execute the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
