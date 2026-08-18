# Express TypeScript & MongoDB Server

A clean, production-ready REST API boilerplate built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. Features a modular directory structure, custom logging & global error middlewares, Mongoose User schema modeling with validation, environment variable configuration, and live-reloading dev environment powered by `tsx`.

---

## 📐 Project Structure

```
my-server/
├── src/
│   ├── config/            # Database and external service configurations
│   │   └── db.ts          # MongoDB Atlas connection handler
│   ├── controllers/       # Business logic / request handlers
│   │   └── health.controller.ts
│   ├── middlewares/       # Express middlewares (logger, global error handler)
│   │   ├── error.middleware.ts
│   │   └── logger.middleware.ts
│   ├── models/            # Mongoose schemas & data models
│   │   └── user.model.ts  # User schema with validation rules & interfaces
│   ├── routes/            # API endpoints mapping to controllers
│   │   └── health.route.ts
│   └── index.ts           # Server entry point & Express configuration
├── .env                   # Environment variables (DB URI, PORT, NODE_ENV)
├── .gitignore             # Git ignored files & folders
├── package.json           # Dependencies and npm scripts
├── tsconfig.json          # TypeScript compiler configuration
└── README.md              # Project documentation
```

### Folder Breakdown

* **`src/config/`**: Contains database connection logic (`db.ts`) for connecting Mongoose to MongoDB Atlas.
* **`src/controllers/`**: Contains function handlers for processing HTTP requests and returning API responses.
* **`src/routes/`**: Defines API paths and binds them to specific controller actions.
* **`src/middlewares/`**: Custom Express middlewares for request logging (`logger.middleware.ts`) and global error handling (`error.middleware.ts`).
* **`src/models/`**: Defines Mongoose schemas, interfaces, and validation rules (`user.model.ts`).
* **`src/index.ts`**: Main entry point connecting to MongoDB, applying middlewares, registering routes, and starting the Express server.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**
* **MongoDB Atlas** cluster (or local MongoDB instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

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

---

## 🗄️ Database Schemas

### User Schema (`src/models/user.model.ts`)

| Field | Type | Validation Rules |
| :--- | :--- | :--- |
| `name` | String | Required, trimmed, max 50 characters |
| `email` | String | Required, unique, lowercase, regex email format validation |
| `passwordHash` | String | Required |
| `role` | String | Enum (`'user'`, `'admin'`), default: `'user'` |
| `createdAt` / `updatedAt` | Date | Auto-generated timestamps |

---

## 🛠️ Technology Stack

* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with [Mongoose](https://mongoosejs.com/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Dev Execution Engine**: [tsx](https://github.com/privatenumber/tsx)
* **Config Management**: [dotenv](https://github.com/motdotla/dotenv)
* **CORS Management**: [cors](https://github.com/expressjs/cors)
