# Express TypeScript Server

A clean, production-ready REST API boilerplate built with **Node.js**, **Express**, and **TypeScript**. Features a modular directory structure (Controllers, Routes, Middlewares, Models), custom logging & error middlewares, environment variable management, and live-reloading dev environment powered by `tsx`.

---

## 📐 Project Structure

```
my-server/
├── src/
│   ├── controllers/       # Business logic / request handlers
│   │   └── health.controller.ts
│   ├── middlewares/       # Express middlewares (auth, validation, logger, error handler)
│   │   ├── error.middleware.ts
│   │   └── logger.middleware.ts
│   ├── models/            # Database schemas & data models
│   │   └── .gitkeep       # Keeps models folder tracked in Git
│   ├── routes/            # API endpoints mapping to controllers
│   │   └── health.route.ts
│   └── index.ts           # Server entry point & Express configuration
├── .env                   # Local environment variables
├── .gitignore             # Git ignored files & folders
├── package.json           # Dependencies and npm scripts
├── tsconfig.json          # TypeScript compiler configuration
└── README.md              # Project documentation
```

### Folder Breakdown

* **`src/controllers/`**: Contains function handlers for processing HTTP requests, executing business logic, and returning responses.
* **`src/routes/`**: Defines API paths and binds them to specific controller actions. Keep routes thin and declarative.
* **`src/middlewares/`**: Custom Express middlewares for request logging (`logger.middleware.ts`), global error handling (`error.middleware.ts`), authentication, and input validation.
* **`src/models/`**: Data layer definitions (e.g., Prisma, TypeORM, or Mongoose models). Includes `.gitkeep` to preserve folder structure in version control.
* **`src/index.ts`**: Initializes environment variables, configures core Express middleware (`cors`, `json`, `requestLogger`), mounts application routes, and registers global error handlers.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**

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

## 🛠️ Technology Stack

* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Dev Execution Engine**: [tsx](https://github.com/privatenumber/tsx)
* **Config Management**: [dotenv](https://github.com/motdotla/dotenv)
* **CORS Management**: [cors](https://github.com/expressjs/cors)
