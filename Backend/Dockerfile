# 1. Build aşaması (Multi-stage build)
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# 2. Runtime aşaması
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/jobTS.sign-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
