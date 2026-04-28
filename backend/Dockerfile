# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY backend/ .
RUN mvn clean install -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/Learning-Management-System-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
