# Express TypeScript & MongoDB Server

A clean, production-ready REST API boilerplate built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. Features a modular directory structure, custom logging & global error middlewares, Mongoose User schema modeling with validation, JWT authentication, environment variable configuration, and a live-reloading dev environment powered by `tsx`.

---

## 📐 Project Structure

```
montu-project/
├── src/
│   ├── config/            # Environment and database configuration
│   │   ├── env.ts         # Loads and validates required environment variables
│   │   └── db.ts          # MongoDB Atlas connection handler
│   ├── controllers/       # Request handlers
│   │   ├── auth.controller.ts
│   │   └── health.controller.ts
│   ├── middlewares/       # Express middlewares
│   │   ├── error.middleware.ts
│   │   ├── logger.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models/            # Mongoose schemas & data models
│   │   └── user.model.ts
│   ├── routes/            # API endpoint mapping
│   │   ├── auth.route.ts
│   │   └── health.route.ts
│   ├── services/          # Business logic (auth, password hashing)
│   │   └── auth.service.ts
│   ├── utils/             # Shared helpers
│   │   └── jwt.ts         # JWT signing
│   └── index.ts           # Server entry point
├── .env.example           # Environment variable template (copy to .env)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Folder Breakdown

* **`src/config/`**: Loads `.env` (`env.ts`) and connects Mongoose to MongoDB Atlas (`db.ts`).
* **`src/controllers/`**: HTTP request handlers that return API responses.
* **`src/routes/`**: API paths bound to controller actions.
* **`src/middlewares/`**: Request logging, input validation, and global error handling.
* **`src/models/`**: Mongoose schemas, interfaces, and validation rules.
* **`src/services/`**: Business logic such as registration, login, and password hashing.
* **`src/utils/`**: Shared helpers such as JWT token generation.
* **`src/index.ts`**: Main entry point: connects to MongoDB, applies middlewares, registers routes, and starts Express.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**
* **MongoDB Atlas** cluster (or local MongoDB instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nancyashraff/montu-project.git
   cd montu-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env` and fill in real values:
   ```bash
   cp .env.example .env
   ```
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   JWT_SECRET=replace-with-a-long-random-string
   ```

   `MONGO_URI` is required. In `NODE_ENV=development`, if `JWT_SECRET` is missing from `.env` the server generates one and saves it there so tokens stay valid after a restart. In any other environment `JWT_SECRET` is required.

---

## ⚙️ Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the server in development mode using `tsx` with hot reload on file changes. |
| `npm run build` | Compiles TypeScript code down to JavaScript in the `dist/` directory. |
| `npm start` | Runs the compiled production build from `dist/index.js`. |

---

## 📡 API Endpoints

### Health Check

* **URL**: `/ping`
* **Method**: `GET`
* **Description**: Returns server health status, uptime, and current ISO timestamp.
* **Sample Response**:
  ```json
  {
    "status": "OK",
    "uptime": 12.34,
    "timestamp": "2026-08-18T12:00:00.000Z"
  }
  ```

### Sign Up

* **URL**: `/api/auth/signup`
* **Method**: `POST`
* **Description**: Validates input, hashes the password with bcrypt, stores the user in MongoDB, and returns a JWT. New accounts are always created with the `user` role.
* **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "secret123"
  }
  ```
* **Sample Response** (`201`):
  ```json
  {
    "status": "success",
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": "64f1c2a0b8e1a2b3c4d5e6f7",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "user"
      },
      "token": "<jwt>"
    }
  }
  ```

### Sign In

* **URL**: `/api/auth/signin`
* **Method**: `POST`
* **Description**: Validates credentials and returns a JWT.
* **Request Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "secret123"
  }
  ```
* **Sample Response** (`200`):
  ```json
  {
    "status": "success",
    "message": "Logged in successfully",
    "data": {
      "user": {
        "id": "64f1c2a0b8e1a2b3c4d5e6f7",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "user"
      },
      "token": "<jwt>"
    }
  }
  ```

---

## 🗄️ Database Schemas

### User Schema (`src/models/user.model.ts`)

| Field | Type | Validation Rules |
| :--- | :--- | :--- |
| `name` | String | Required, trimmed, max 50 characters |
| `email` | String | Required, unique, lowercase, regex email format validation |
| `passwordHash` | String | Required |
| `role` | String | Enum (`'user'`, `'admin'`), default: `'user'`. Public signup always assigns `'user'`. |
| `createdAt` / `updatedAt` | Date | Auto-generated timestamps |

---

## 🛠️ Technology Stack

* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with [Mongoose](https://mongoosejs.com/)
* **Auth**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) and [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
* **Validation**: [express-validator](https://express-validator.github.io/docs/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Dev Execution Engine**: [tsx](https://github.com/privatenumber/tsx)
* **Config Management**: [dotenv](https://github.com/motdotla/dotenv)
* **CORS Management**: [cors](https://github.com/expressjs/cors)
