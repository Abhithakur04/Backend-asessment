# 📝 Simple Task Manager Backend

This is a basic **Node.js + Express** backend API for a task manager app. It supports user registration, login, token-based sessions, and CRUD operations on tasks. Data is stored **in-memory**, making it easy to understand and use for learning or small projects.

---

## 🚀 Features

- ✅ User Registration
- ✅ User Login with token-based session (no 3rd party auth)
- ✅ Add a task (user-specific)
- ✅ View all tasks (user-specific)
- ✅ Delete a task by ID
- 🧠 In-memory data storage (or can switch to file-based)

---

## 📦 Tech Stack

- Node.js
- Express.js
- UUID (for tokens & task IDs)

---


---

## 📌 API Endpoints

### 🔐 Auth

- `POST /register`  
  Register a new user  
  **Body:** `{ "username": "user", "password": "pass" }`

- `POST /login`  
  Login and receive a token  
  **Body:** `{ "username": "user", "password": "pass" }`  
  **Returns:** `{ token: "your-token" }`

### 🧾 Tasks (require token in `Authorization` header)

- `POST /tasks`  
  Add a new task  
  **Body:** `{ "task": "Your task here" }`

- `GET /tasks`  
  View all your tasks

- `DELETE /tasks/:taskId`  
  Delete a task

---

## 🛠️ How to Run

```bash
npm install
node app.js
