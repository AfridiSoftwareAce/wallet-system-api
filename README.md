# 💰 Wallet System API

A production-ready Node.js backend for a simple wallet system with secure transactions, JWT authentication, PostgreSQL integration, and full Swagger documentation.

Built with 💪 passion and best practices by **Afridi Wara**.

🔗 GitHub Repo: [https://github.com/AfridiSoftwareAce/wallet-system-api](https://github.com/AfridiSoftwareAce/wallet-system-api)

---

## 📦 Features

- 🧑‍💼 User registration and login with email
- 🔐 Secure JWT authentication & authorization
- 💸 Add and withdraw money from wallet
- 📄 Transaction history with pagination
- ✅ Joi-based input validation
- 🧪 Fully tested with Jest + Supertest
- 📘 Swagger API docs at `/api-docs`
- 🐳 Docker-based PostgreSQL setup
- 🔐 `.env.example` included for safe environment config

---

## 🚀 Tech Stack

| Technology     | Purpose                        |
|----------------|--------------------------------|
| **Node.js**    | Backend runtime                |
| **Express.js** | API framework                  |
| **PostgreSQL** | Database                       |
| **Docker**     | Containerized DB environment   |
| **Joi**        | Input validation               |
| **JWT**        | Authentication                 |
| **Swagger**    | API documentation              |
| **Jest**       | Unit testing                   |
| **Supertest**  | API endpoint testing           |

---

## 🔐 Authentication

All secured routes require a valid JWT token.  
Use the `/login` endpoint to get your token, then include this in headers:
Authorization: Bearer <your_token_here>


---

## 📘 API Documentation

Swagger UI is available at:

http://localhost:5000/api-docs


Explore all routes with schemas, try out requests, and see responses live.

---

## 📁 Folder Structure

wallet-system/
├── src/
│ ├── config/ # DB configuration
│ ├── controllers/ # Route handlers
│ ├── middleware/ # Auth + Validation
│ ├── models/ # DB queries
│ ├── routes/ # Route definitions
│ ├── validators/ # Joi schemas
│ └── app.js # Express app setup
├── tests/ # Jest test files
├── swagger/ # Swagger spec
├── docker-compose.yml # PostgreSQL setup
├── Dockerfile # Node container (optional)
├── .env # Environment variables (ignored)
├── .env.example # Safe public environment file ✅
├── index.js # Entry point
└── README.md # Project documentation


---

## 🛠️ Setup Instructions

### 1. Clone & Install
```bash
git clone https://github.com/AfridiSoftwareAce/wallet-system-api.git
cd wallet-system-api
npm install


2. Setup Docker PostgreSQL
docker-compose up -d


3. Configure Environment
Create a .env file based on the provided .env.example:

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=wallet_system_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d


4. Start the App
npm run dev


🧪 Run Unit Tests
npm test


Test coverage includes:

User registration

Login

Adding & withdrawing funds

Viewing user details

Viewing transaction history


✅ Best Practices Followed
Modular folder structure

JWT-based route protection

Environment variables secured via .env

Public-safe .env.example included

Request validation using Joi

API documented using Swagger

Fully tested endpoints using Jest + Supertest



👨‍💻 Author
Afridi Wara
Backend Developer | Node.js Expert
📫 Email: afridiwara.dev@gmail.com
📍 India

⭐ If you like this project, feel free to fork, star, and contribute!