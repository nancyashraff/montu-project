# Express TypeScript & MongoDB Server

A REST API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. It includes JWT authentication, protected Task CRUD, request validation, and a Postman collection for frontend consumption.

---

## 📐 Project Structure

```
montu-project/
├── src/
│   ├── config/
│   │   ├── env.ts
│   │   ├── db.ts
│   │   └── seed.ts        # Creates default tester admin on startup
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── health.controller.ts
│   │   └── task.controller.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── logger.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   └── task.model.ts
│   ├── routes/
│   │   ├── auth.route.ts
│   │   ├── health.route.ts
│   │   └── task.route.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── task.service.ts
│   ├── types/
│   │   └── express.d.ts
│   ├── utils/
│   │   ├── app-error.ts
│   │   └── jwt.ts
│   ├── app.ts             # Express app (exported for Vercel)
│   └── index.ts           # Local listen + Vercel default export
├── postman/
│   ├── Montu-API.postman_collection.json
│   └── Montu-API-Local.postman_environment.json
├── .env.example
├── vercel.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** v20 or higher
* **npm**
* **MongoDB Atlas** cluster (or local MongoDB)

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
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=Admin1234
   ```

   `MONGO_URI` is required. In `NODE_ENV=development`, if `JWT_SECRET` is missing from `.env` the server generates one and saves it there so tokens stay valid after a restart. In any other environment `JWT_SECRET` is required.

   A default tester admin is created on startup. See **Default admin (for testers)** below.

---

## 👤 Default admin (for testers)

On startup the server creates this admin **if that email is not already in the database**. Restart with `npm run dev` and look for `Default admin ready. Sign in with admin@example.com` in the console.

| | |
| :--- | :--- |
| **Email** | `admin@example.com` |
| **Password** | `Admin1234` |

Public signup cannot create an admin. Only an existing admin can add another one.

**1. Sign in** — `POST /api/auth/signin` (no token):

```json
{
  "email": "admin@example.com",
  "password": "Admin1234"
}
```

Copy `data.token` from the response.

**2. Add another admin** — `POST /api/auth/admins`  
Authorization: Bearer Token → paste that token.

```json
{
  "name": "Admin Two",
  "email": "admin2@example.com",
  "password": "secret123"
}
```

Expected **201** and `"role": "admin"`.

**Which requests need a token**

| Endpoint | Token? |
| :--- | :--- |
| `GET /ping` | No |
| `POST /api/auth/signup` | No |
| `POST /api/auth/signin` | No |
| `POST /api/auth/admins` | Yes — must be an **admin** |
| `GET/POST /api/tasks` | Yes — any logged-in user |
| `GET/PUT/DELETE /api/tasks/:id` | Yes — any logged-in user |

No logout endpoint: to switch users, sign in again and paste the new token. Protected requests do not inherit a parent token in Postman — paste it on each protected request.

On Vercel, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` to the same values so the live app also gets this admin.

---

## ⚙️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the server in development mode using `tsx` with hot reload. |
| `npm run build` | Compiles TypeScript to JavaScript in `dist/`. |
| `npm start` | Runs the compiled production build from `dist/index.js`. |

---

## 📡 API Endpoints

Protected routes require:

```
Authorization: Bearer <jwt>
```

### Health Check

* **URL**: `/ping`
* **Method**: `GET`
* **Auth**: None
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
* **Auth**: None
* **Description**: Creates a `user`. Sending `"role": "admin"` is rejected with `403` unless no admin exists yet (first-admin bootstrap).
* **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "secret123"
  }
  ```

### Sign In

* **URL**: `/api/auth/signin`
* **Method**: `POST`
* **Auth**: None
* **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "Admin1234"
  }
  ```
  That is the default tester admin created on startup. After sign-in, copy `data.token` for protected routes.

### Create Admin

* **URL**: `/api/auth/admins`
* **Method**: `POST`
* **Auth**: Bearer token of an **admin**
* **Request Body**:
  ```json
  {
    "name": "Admin Two",
    "email": "admin2@example.com",
    "password": "secret123"
  }
  ```
  Regular users receive `403`. Missing/invalid tokens receive `401`.

### Tasks (protected)

| Method | URL | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | List the authenticated user's tasks |
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks/:id` | Get one task |
| `PUT` | `/api/tasks/:id` | Update one task |
| `DELETE` | `/api/tasks/:id` | Delete one task |

**Create / update body:**

```json
{
  "title": "Finish Task 3.4",
  "description": "CRUD, Postman collection, and deployment",
  "status": "todo"
}
```

`title` is required on create. `status` may be `todo`, `in-progress`, or `done`. Users can only read and change their own tasks.

---

## 📬 Postman

Import the collection so frontend (or reviewers) can call every endpoint with working examples:

1. Open Postman → **Import**
2. Select `postman/Montu-API.postman_collection.json`
3. Optionally import `postman/Montu-API-Local.postman_environment.json`
4. Set collection variable `baseUrl` to `http://localhost:3000` or the live URL
5. Run **Sign In** with `admin@example.com` / `Admin1234` (or **Sign Up** for a regular user). Copy `data.token` and paste it into **Authorization → Bearer Token** on Tasks or Create Admin. Those requests do not inherit a parent token.
6. Run **Create Task** — the new id is stored in `{{taskId}}` for get/update/delete

---

## 🗄️ Database Schemas

### User

| Field | Type | Validation Rules |
| :--- | :--- | :--- |
| `name` | String | Required, trimmed, max 50 characters |
| `email` | String | Required, unique, lowercase |
| `passwordHash` | String | Required |
| `role` | String | Enum (`user`, `admin`), default `user`. Public signup assigns `user`. Only an admin can create another admin (`POST /api/auth/admins`). |
| `createdAt` / `updatedAt` | Date | Auto-generated timestamps |

### Task

| Field | Type | Validation Rules |
| :--- | :--- | :--- |
| `title` | String | Required, trimmed, max 100 characters |
| `description` | String | Optional, max 500 characters |
| `status` | String | Enum (`todo`, `in-progress`, `done`), default `todo` |
| `userId` | ObjectId | Required, indexed, references User |
| `createdAt` / `updatedAt` | Date | Auto-generated timestamps |

---

## ☁️ Deployment (Vercel)

Vercel runs this Express app as a serverless function. `src/index.ts` exports the app; `app.listen` only runs locally (not on Vercel).

1. In MongoDB Atlas → **Network Access**, allow `0.0.0.0/0` so Vercel can connect.
2. Push this repository to GitHub.
3. In [Vercel](https://vercel.com), import the GitHub repo (Framework Preset can stay as Other / Express).
4. Add environment variables:
   * `NODE_ENV` = `production`
   * `MONGO_URI` = your Atlas connection string
   * `JWT_SECRET` = a long random string
   * `ADMIN_EMAIL` = `admin@example.com`
   * `ADMIN_PASSWORD` = `Admin1234`
5. Deploy.

After deploy, open `https://<your-project>.vercel.app/ping`. Point Postman `baseUrl` at that origin and run the collection against the live API.

You can also deploy from the CLI:

```bash
npx vercel
```

---

## 🛠️ Technology Stack

* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with [Mongoose](https://mongoosejs.com/)
* **Auth**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) and [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
* **Validation**: [express-validator](https://express-validator.github.io/docs/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Hosting**: [Vercel](https://vercel.com)
