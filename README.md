# 🏀 Sportsphere Project 🏆

This project manages a **frontend** and **backend** for the Sportsphere application using Docker Compose. Environment variables for the frontend and backend are stored separately and combined automatically before running the application.

---

## 📂 Folder Structure
```
.
├── docker-compose.yml   # Docker Compose configuration
├── combine-env.sh       # Script to combine .env files
├── frontend/            # Frontend code and environment
│   ├── Dockerfile
│   ├── .env
│   └── src/
├── backend/             # Backend code and environment
│   ├── Dockerfile
│   ├── .env
│   └── src/
└── .env (Generated automatically)
```

---

## ✅ Prerequisites
1. Install [Docker](https://www.docker.com/) and ensure Docker Compose is included. 🐳
2. Ensure the `combine-env.sh` script is executable:
   ```bash
   chmod +x combine-env.sh
   ```

---

## 🚀 Steps to Run

### 1️⃣ Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/bsospace/SportSphere.git
cd sportsphere
```

### 2️⃣ Add Environment Variables
Define environment variables in separate `.env` files for the frontend and backend:

#### `frontend/.env`
```env
NEXT_PUBLIC_APP_OPENID_API=
NEXT_PUBLIC_APP_URL_CALL_BACK=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_URL=
NEXT_PUBLIC_API_SPORT=
```

#### `backend/.env`
```env
# Prisma Database Connection
DATABASE_URL=

# Application
APP_PORT=
NODE_ENV=
APP_URL=

# PostgreSQL Database
PG_USER=
PG_PASSWORD=
PG_DATABASE=
DB_PORT=

# PgAdmin
PGADMIN_EMAIL=
PGADMIN_PASSWORD=
PGADMIN_PORT=

# OpenID API
OPENID_API=
SERVICE_NAME=
```

### 3️⃣ Combine Environment Variables
Run the `combine-env.sh` script to merge the `.env` files into a single `.env` file in the root directory:
```bash
./combine-env.sh
```

The script will generate a root `.env` file containing both frontend and backend environment variables. ✅

### 4️⃣ Start the Application
Run Docker Compose to start all services:
```bash
docker compose up
```

This will:
- 🖥️ Build the **frontend** and **backend** Docker images.
- 🛠️ Start the `frontend`, `backend`, `db` (PostgreSQL), and `pgadmin` services.

### 5️⃣ Access the Application
- **Frontend**: Visit [http://localhost:5056](http://localhost:5056) 🖼️  
- **Backend**: The backend API will run on [http://localhost:3001](http://localhost:3001) ⚙️  
- **pgAdmin**: Visit [http://localhost:5050](http://localhost:5050) and log in using:
  - Email: `admin@example.com`
  - Password: `securepassword`

---

## 🛑 Stopping the Application
To stop the application, press `Ctrl + C` or run:
```bash
docker compose down
```

---

## 🔧 Troubleshooting

### ❗ Missing `.env` Variables
If you encounter warnings about missing `.env` variables:
1. Ensure the `.env` files exist in the `frontend` and `backend` directories.
2. Re-run the `combine-env.sh` script:
   ```bash
   ./combine-env.sh
   ```

### 🔄 Rebuilding Images
If changes are made to the `Dockerfile` or dependencies, rebuild the services:
```bash
docker compose up --build
```

---

## 📌 Additional Notes
- The `combine-env.sh` script automatically combines variables from `frontend/.env` and `backend/.env` into a root `.env` file. 🔗
- This structure ensures modular development while keeping environment configuration consistent. ✅

---

Enjoy building your Sportsphere application! 🏀⚽🏐