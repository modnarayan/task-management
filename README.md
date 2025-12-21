````md
# Task Manager App

A full-stack Task Manager application built with **Node.js, Express, Sequelize, MySQL, and Next.js**.  
It supports user authentication, task management, and category management.

---

## Requirements

- Node.js 20+
- MySQL 8+
- Docker (optional)

---

## Backend Setup

```bash
cd backend
npm install
```
````

### Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Update the values:

```env
DB_NAME=task_manager
DB_USER=root
DB_PASS=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret_here
```

### Start MySQL (Docker)

```bash
docker-compose up -d mysql
```

### Run Backend Server

```bash
npm run dev
```

Backend will run on:
`http://localhost:5000`

---

## Frontend Setup

```bash
cd frontend
npm install
```

### Environment Variables

Create `.env.local`:

```bash
cp .env.example .env.local
```

Update API URL if needed:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Run Frontend Server

```bash
npm run dev
```

Frontend will run on:
`http://localhost:3000`

---

## API Endpoints

### Authentication

- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user

---

### Tasks (Protected)

- `GET /api/tasks` – Get all tasks
- `POST /api/tasks` – Create task
- `PUT /api/tasks/:id` – Update task
- `DELETE /api/tasks/:id` – Delete task

---

### Categories (Protected)

- `GET /api/tasks/categories` – Get categories
- `POST /api/tasks/categories` – Create category

---

### User (Protected)

- `GET /api/users/profile` – Get profile
- `PUT /api/users/profile` – Update profile

---

## Notes

- Authentication is handled using **JWT**
- Tasks and categories are user-specific
- Passwords are hashed using **bcrypt**

---
