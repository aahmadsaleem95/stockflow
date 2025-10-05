# 🧩 Items Management App

A full-stack application built with **React**, **Node.js (Express)**, **PostgreSQL**, and **Docker** — allowing users to create, update, delete, and search items with pagination support.

---

## 🚀 Tech Stack

| Layer            | Technology                                      | Description                                  |
| ---------------- | ----------------------------------------------- | -------------------------------------------- |
| Frontend         | **React + TypeScript + Tailwind CSS + Zod**     | Responsive UI built with reusable components |
| Backend          | **Node.js + Nest + TypeScript + TypeORM + Zod** | REST API for CRUD operations                 |
| Database         | **PostgreSQL**                                  | Relational database for storing items        |
| Containerization | **Docker + Docker Compose**                     | One-command setup for the full app           |

---

## 🧱 Project Structure

```
.
├── client/           # React frontend (Tailwind + CRA)
├── server/           # Express backend with TypeORM or pg
├── docker-compose.yml
├── .env              # Shared environment variables
└── README.md
```

---

## ⚙️ Environment Variables

All environment variables are stored in a single `.env` file at the **root** of the project.

### Example `.env`

```bash
# 🖥️ Backend
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=12345
DB_NAME=items_db

# 🌐 Frontend
REACT_APP_API_URL=http://localhost:4000

# Postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=12345
POSTGRES_DB=items_db
```

> ⚠️ Note: `DB_HOST=db` (not `localhost`) — this allows the backend to connect to the Postgres service inside Docker.

---

## 🐳 Running with Docker

> You only need **Docker** and **Docker Compose** installed.  
> No need to install Node, npm, or Postgres manually.

### 🧰 Step 1: Build and Start Containers

```bash
docker compose up --build
```

This will:

- Build the **backend** and **frontend** images
- Create a **PostgreSQL** database container
- Run database migrations (if configured)
- Seed the database with sample items (optional)

### 🖥️ Step 2: Access the App

- Frontend → http://localhost:3000
- Backend API → http://localhost:4000
- PostgreSQL DB → localhost:5432

---

## 🧪 Useful Commands

| Command                                           | Description                |
| ------------------------------------------------- | -------------------------- |
| `docker compose up`                               | Start all services         |
| `docker compose down`                             | Stop and remove containers |
| `docker exec -it db psql -U postgres -d items_db` | Open PostgreSQL shell      |
| `docker logs <container_name>`                    | View container logs        |
| `docker compose build`                            | Rebuild images             |

---

## 🧠 Common Issues

### ❌ Frontend API not reachable

Make sure the frontend `.env` uses:

```bash
REACT_APP_API_URL=http://backend:4000
```

if running **inside Docker**,  
or

```bash
REACT_APP_API_URL=http://localhost:4000
```

if running **outside Docker** (during local dev).

### ❌ Database connection failed

Ensure:

- `DB_HOST=db` (matches service name in `docker-compose.yml`)
- Database container is healthy (`docker ps`)

---

## 📦 Example Seed Data

To manually seed 50 records:

```bash
docker exec -it db psql -U postgres -d items_db -f /seed_items.sql
```

---

## 🧰 Development Notes

- Frontend uses **React Router** and **Tailwind CSS**
- Backend uses **Express**, **TypeScript**, and **TypeORM/pg**
- Data fetching with **Axios**
- Toast notifications via **react-toastify**

---

## 🧹 Cleanup

To remove containers, volumes, and networks:

```bash
docker compose down -v
```

---

## 🧑‍💻 Author

Developed by Aahmad Saleem Butt
Made with ⚓ using Docker and TypeScript.
