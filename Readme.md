# 🚀 Job Tracking System V1

The **Job Tracking System V1** is a full-stack project management and job tracking application that enables teams to efficiently manage projects, tasks, sprints, and workflows.  
It combines a **Next.js + TypeScript frontend** with a **Spring Boot + PostgreSQL backend** to provide a modern, secure, and scalable system.  

![Project Screenshot 1](link_to_screenshot_1.png)  
![Project Screenshot 2](link_to_screenshot_2.png)  
*(Replace the placeholders above with screenshots of your application.)*

---

## ✨ Features

### 🔐 User Management
- User registration and login.
- JWT-based secure authentication (via Spring Security).
- Role-based access control for projects and tasks.

### 📂 Project Management
- Create and manage projects.
- Invite team members to collaborate.
- Assign roles within projects.

### ✅ Task Management
- Create tasks within projects.
- Assign tasks to specific users.
- Add comments, descriptions, and updates to tasks.
- Track deadlines and priorities.

### 🏃 Sprint Management
- Create and manage sprints for agile workflows.
- Add and remove tasks from sprints.
- Assign users to sprints.
- Review sprint progress and performance.

### 📋 Backlog Management
- Maintain a backlog of pending tasks.
- Move tasks between backlog and sprints.
- Reassign tasks between different sprints.
- Organize upcoming work with drag-and-drop style planning.

### 🗂️ Kanban Board
- Visualize tasks with a Kanban board interface.
- Track progress across statuses: *To Do, In Progress, Done*.
- Improve productivity with a clear overview of work.

### 🔔 Notification Management
- Receive notifications for task assignments, comments, and updates.
- Stay informed about sprint and project events.

---

## 🏗️ Architecture

This project follows a **monorepo-style structure** where both the frontend and backend live in the same repository:

```
Job-TS-v1-NextJs-SpringBoot/
│── backend/       # Spring Boot backend
│── frontend/      # Next.js frontend
│── README.md      # Project documentation
```

- **Frontend** communicates with the **backend REST APIs** for authentication, project/task data, and notifications.
- **Backend** uses Spring Boot with JPA/Hibernate to interact with a PostgreSQL database.
- Authentication is implemented with **JWT** and integrated into both frontend and backend flows.

---

## 🛠️ Technologies

### 🌐 Frontend
- [Next.js 14](https://nextjs.org/) – React framework with SSR & SSG support.
- [TypeScript](https://www.typescriptlang.org/) – Type safety and maintainability.
- [NextAuth.js](https://next-auth.js.org/) – Authentication for Next.js.
- [Material UI](https://mui.com/) – UI component library.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling.

### ⚙️ Backend
- [Spring Boot 3](https://spring.io/projects/spring-boot) – Backend framework.
- [Spring Security](https://spring.io/projects/spring-security) – Authentication and authorization.
- [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) – Language runtime.
- [PostgreSQL](https://www.postgresql.org/) – Relational database.
- [Hibernate ORM](https://hibernate.org/) & [JPA](https://jakarta.ee/specifications/persistence/) – Database mapping.
- Spring MVC & Spring Data – REST APIs and data persistence.
- [JWT](https://jwt.io/) – JSON Web Token authentication.

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup
1. Install and run **PostgreSQL** locally.
   - Create a database (e.g., `jobts`).
2. Configure the database in `application.yml`:

```yaml
server:
  port: 8080

## -Dspring.profiles.active=local

spring:
  servlet:
    multipart:
      enabled: true
      max-file-size: 50MB
      max-request-size: 100MB
  application:
    name: swap.be
  datasource:
    url: jdbc:postgresql://localhost:5432/jobts
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: update
      dialect: org.hibernate.dialect.PostgreSQLDialect
    show-sql: false

jwt:
  secret: "QWx3YXlzLXNlY3VyZS1hbmQtc3Ryb25nLWtleS1mb3Itam90LTUxMi1zZWN1cml0eS0xMjM0NTY3ODkwMTIzNDU2Nzg5"
  expiredDay: 86400000

expiredTime:
  hour: 1
```

3. Navigate to the backend directory and start the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   # or
   ./gradlew bootRun
   ```

The backend will run at: `http://localhost:8080`

---

### 🎨 Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Create an `.env.local` file for environment variables (example):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   NEXTAUTH_SECRET=your_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

The frontend will run at: `http://localhost:3000`

---

## 🚀 Usage

1. Start both **backend** and **frontend** applications.
2. Open `http://localhost:3000` in your browser.
3. Register a new user or log in with existing credentials.
4. Create a project, invite team members, and begin assigning tasks.
5. Organize work using sprints, backlog, and the Kanban board.

---

## 🤝 Contributing

Contributions are welcome!  
To contribute:
1. Fork the repository.
2. Create a feature branch:  
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes and push to your fork.
4. Submit a pull request with a clear description.

Please follow standard coding practices and ensure all new code is tested before submitting.

---

## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

## 📷 Screenshots & Demo

*(Add screenshots, demo GIFs, or even a link to a deployed version here to showcase the system in action.)*
