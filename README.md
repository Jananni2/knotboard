# KnotBoard

A collaborative board management system for creating boards,
managing sticky notes, controlling participation, and tracking
board activity.

## Overview

KnotBoard is a full-stack web application designed to support
collaborative board-based discussions.

The system provides role-based access for:

- Facilitators
- Contributors
- Stakeholders

Facilitators can create and manage boards, Contributors can
participate by adding sticky notes, and Stakeholders can view
board information without modifying content.

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure password hashing using BCrypt
- Stateless authentication

### Board Management
- Create and manage boards
- Active/Archived board states
- Configurable note capacity
- Board member management

### Sticky Notes
- Create and update notes
- Position notes on the board
- Color-coded notes
- Note versioning
- Concurrent update handling

### Activity Tracking
- Track board activities
- Display recent activity
- Record actor and action
- Timestamped activity history

### Analytics
- Active note count
- Contributor statistics
- Note color distribution
- Board activity insights

## Tech Stack

### Frontend
- React
- React Router
- Redux Toolkit
- Axios
- JavaScript
- CSS

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT

### Database
- MySQL

### Tools
- Git
- GitHub
- Docker
- VS Code

## Architecture

React Frontend
        |
        | REST API
        ↓
Spring Boot Backend
        |
        | JPA / Hibernate
        ↓
MySQL Database

Authentication is handled using JWT tokens,
with Spring Security enforcing role-based access.

## Screenshots

### Login
![Login](screenshots/login.png)

### Board
![Board](screenshots/board.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Analytics
![Analytics](screenshots/analytics.png)

### Activity
![Activity](screenshots/activity.png)

## Getting Started

### Prerequisites

Make sure you have:

- Java 17+
- Node.js
- npm
- MySQL
- Git

### 1. Clone the repository

git clone <your-repository-url>

cd KnotBoard

### 2. Configure MySQL

Create a database:

CREATE DATABASE knotboard;

Update the database configuration in the backend
with your local MySQL username and password.

### 3. Start the backend

cd backend

./mvnw spring-boot:run

On Windows:

mvnw.cmd spring-boot:run

The backend runs on:

http://localhost:8080

### 4. Start the frontend

Open another terminal:

cd frontend

npm install

npm start

The frontend runs on:

http://localhost:3000

## Security

Do not commit:

- Database passwords
- JWT secrets
- API keys
- `.env` files

Use environment variables for sensitive configuration.

## Future Improvements

- Real-time collaboration using WebSockets
- Improved board synchronization
- Automated testing
- CI/CD pipeline
- Cloud deployment
- Performance monitoring

## Author

K. Jananni

GitHub: https://github.com/Jananni2
