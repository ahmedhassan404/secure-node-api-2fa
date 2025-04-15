# Secure Node.js API with 2FA, JWT, and CRUD Operations

A secure backend API built using **Node.js** and **Express.js**, this project features robust authentication with **JWT**, password hashing via **bcrypt**, and **Two-Factor Authentication (2FA)** using Google Authenticator. It includes full **CRUD operations** for managing products, with all endpoints protected by JWT and 2FA.

---

## 🚀 Features

- User registration and login
- Secure password hashing with bcrypt
- Token-based authentication using JWT
- Google Authenticator-based 2FA
- Full CRUD operations for products
- Protected routes requiring JWT and verified 2FA
- Testable using Postman or any REST client

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** bcrypt, JWT, Google Authenticator (OTP)
- **Tools & Environment:** Postman, dotenv

---

## 📁 Project Structure

```
project-root/
│
├── config/
│   └── database.js              # MySQL database connection setup
│
├── models/
│   ├── user.js                  # User model
│   └── product.js               # Product model
│
├── routes/
│   ├── auth.js                  # Authentication routes (register, login, 2FA)
│   └── products.js              # Product CRUD routes
│
├── middleware/
│   └── auth.js                  # Middleware for JWT and 2FA verification
│
├── utils/
│   ├── passwordUtils.js         # Password utility functions
│   └── twoFactorAuth.js         # 2FA utility functions
│
├── .env                         # Environment variables
├── server.js                    # Application entry point
└── package.json                 # Project dependencies and metadata
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ahmedhassan404/secure-node-api-2fa.git
cd secure-node-api-2fa
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your configuration:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

### 4. Set Up the Database

Run the MySQL setup scripts or manually create the required `users` and `products` tables.

### 5. Start the Server

```bash
npm start
```

---

## 📨 API Endpoints

### 🔐 Authentication Routes

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| POST   | `/api/register`   | Register a new user     |
| POST   | `/api/login`      | Log in and receive JWT  |
| POST   | `/api/verify-2fa` | Verify OTP from 2FA app |

### 📦 Product Routes (Protected)

All routes below require a valid JWT and verified 2FA.

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| GET    | `/api/products`     | Retrieve all products |
| POST   | `/api/products`     | Create a new product  |
| PUT    | `/api/products/:id` | Update product by ID  |
| DELETE | `/api/products/:id` | Delete product by ID  |

## 👤 Author

**Ahmed Hassan**\
📧 [a7medhassan1@gmail.com](mailto\:a7medhassan1@gmail.com)\
🔗 [LinkedIn Profile](https://www.linkedin.com/in/ahmed-hassan-576350247/)

---
