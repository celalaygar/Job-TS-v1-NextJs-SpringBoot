# Job Tracking System

This project is a comprehensive job tracking system that allows users to manage their projects, create and assign tasks, plan sprints, and track progress via a Kanban board.

![Project Screenshot 1](link_to_screenshot_1.png)
![Project Screenshot 2](link_to_screenshot_2.png)
*(You can add screenshots of your project's interface here.)*

## Features

* **User Management:**
    * User creation and login.
* **Project Management:**
    * Project creation.
    * Inviting users to projects.
* **Task Management:**
    * Creating tasks within a project.
    * Assigning tasks to users.
    * Adding comments to tasks.
* **Sprint Management:**
    * Creating sprints.
    * Reviewing sprints (including tasks and users within).
    * Adding and removing tasks from sprints.
    * Adding and removing users from sprints.
* **Backlog Management:**
    * Backlog screen.
    * Adding tasks to the backlog.
    * Moving tasks from the backlog to a selected sprint.
    * Moving tasks from a sprint to another sprint or the backlog.
    * Assigning tasks from the backlog to a selected sprint.
* **Kanban Board:**
    * Visually tracking the status of tasks.
* **Notification Management:**
    * Managing notifications related to various system events.

## Technologies

This project utilizes the following technologies:

* **Frontend:**
    * [Next.js](https://nextjs.org/)
    * [Material UI](https://mui.com/)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [TypeScript](https://www.typescriptlang.org/)
* **Backend:**
    * [Spring Boot](https://spring.io/projects/spring-boot)
    * [Spring Security](https://spring.io/projects/spring-security)
    * [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
    * [PostgreSQL](https://www.postgresql.org/)
    * [Hibernate](https://hibernate.org/)
    * [JPA (Java Persistence API)](https://jakarta.ee/specifications/persistence/)

## Setup

To run the project on your local machine, follow these steps:

### Backend Setup

1.  Install and run PostgreSQL.
2.  Configure the database connection settings in the `application.properties` or `application.yml` file.
3.  Navigate to the backend project directory in the terminal and run the following command to start the backend application:
    ```bash
    ./mvnw spring-boot:run
    ```
    or
    ```bash
    ./gradlew bootRun
    ```

### Frontend Setup

1.  Navigate to the frontend project directory:
    ```bash
    cd frontend
    ```
2.  Install the necessary dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  Start the application in development mode:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    The frontend application will typically run at `http://localhost:3000`.

## Usage

Once the application is running, you can access it via a browser and start using it by creating a new account or logging in with an existing one. You can then create projects, invite team members, and begin managing your workflow.

## Contributing

If you'd like to contribute to this project, please submit a pull request or create an issue to report suggestions and bugs.

## License

Licensed under the \[License Name Here]. See the `LICENSE` file for more info.

---

I hope this English version of the `README.md` file is helpful! You can add this content to your GitHub repository to better introduce your project. If there are any other sections or details you'd like to include, please let me know, and I'd be happy to assist. Also, don't forget to add a few visuals of your project's interface where the placeholders for screenshots are.
