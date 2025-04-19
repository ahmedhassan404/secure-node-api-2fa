# Secure Node.js API with 2FA, JWT, and CRUD Operations

This project is a secure backend API developed using **Node.js** and **Express.js**. It implements robust authentication mechanisms, including **JWT-based access tokens**, **password hashing with bcrypt**, and **Two-Factor Authentication (2FA)** using **Google Authenticator**. The API provides complete **CRUD functionality** for managing products, with all endpoints secured through JWT and 2FA verification.

---

## Features

- User registration and login functionality  
- Secure password hashing with bcrypt  
- Token-based authentication using JSON Web Tokens (JWT)  
- Two-Factor Authentication (2FA) using Google Authenticator (Time-based OTP)  
- Complete CRUD operations for product management  
- Middleware-protected routes requiring both JWT and successful 2FA verification  
- Easily testable using Postman or other REST clients  

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Authentication:** bcrypt, JWT, Google Authenticator (OTP)  
- **Development Tools:** dotenv, Postman  

---

## Project Structure

```
project-root/
│
├── config/
│   └── database.js              # MySQL database connection configuration
│
├── models/
│   ├── user.js                  # User model
│   └── product.js               # Product model
│
├── routes/
│   ├── auth.js                  # Routes for registration, login, and 2FA verification
│   └── products.js              # Routes for product CRUD operations
│
├── middleware/
│   └── auth.js                  # Middleware for JWT and 2FA verification
│
├── utils/
│   ├── passwordUtils.js         # Password-related utility functions
│   └── twoFactorAuth.js         # 2FA setup and verification logic
│
├── .env                         # Environment variables
├── server.js                    # Main application entry point
└── package.json                 # Project dependencies and scripts
```

---

## Getting Started

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

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

### 4. Set Up the Database

Run the required MySQL setup scripts or manually create the `users` and `products` tables in your MySQL database.

### 5. Start the Server

```bash
npm start
```

---

## API Endpoints

### Authentication Routes

| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| POST   | `/api/register`   | Register a new user          |
| POST   | `/api/login`      | Authenticate and receive JWT |
| POST   | `/api/verify-2fa` | Submit OTP for 2FA           |

### Product Routes (Protected)

These routes require a valid JWT token and a successful 2FA verification:

| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| GET    | `/api/products`     | Retrieve all products   |
| POST   | `/api/products`     | Create a new product    |
| PUT    | `/api/products/:id` | Update a product by ID  |
| DELETE | `/api/products/:id` | Delete a product by ID  |

---

## Author

**Ahmed Hassan**  
Email: [a7medhassan1@gmail.com](mailto:a7medhassan1@gmail.com)  
LinkedIn: [https://www.linkedin.com/in/ahmed-hassan-576350247/](https://www.linkedin.com/in/ahmed-hassan-576350247/)
