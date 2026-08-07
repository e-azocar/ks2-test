# Sistema de Gestión de Inmuebles - API & Web Client

Este proyecto incluye la API backend (NestJS + Prisma + PostgreSQL) y el cliente web (React + Vite + Tailwind CSS).

---

## 🛠️ Requisitos Previos

* **Node.js**: `v20` o superior
* **PostgreSQL**: Servidor de base de datos activo
* **npm** o **yarn**

---

## 🚀 Configuración y Ejecución paso a paso

### 1. Backend (NestJS + Prisma)

1. **Entrar a la carpeta del backend e instalar dependencias:**
   ```bash
   cd backend
   yarn install
   ```

2. **Variables de entorno:**
   Crea un archivo `.env` en la raíz de `backend/` tomando como base el archivo `.env.example`:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/inmuebles_db?schema=public"
   JWT_SECRET="secret_jwt_key"
   CLIENT_URL="http://localhost:5173"
   ```

3. **Base de Datos, Migraciones y Seeders:**
   ```bash
   # Aplicar migraciones de Prisma
   npx prisma migrate dev

   # Generar cliente de Prisma
   npx prisma generate

   # Poblar la base de datos con usuarios e inmuebles de prueba
   npx prisma db seed
   ```

4. **Iniciar la API backend:**
   ```bash
   yarn start:dev
   ```
   *El servidor quedará corriendo en `http://localhost:3000`.*

---

### 2. Frontend (React + Vite)

1. **Entrar a la carpeta del frontend e instalar dependencias:**
   ```bash
   cd frontend
   yarn install
   ```

2. **Variables de entorno:**
   Crea un archivo `.env` en la raíz de `frontend/`:
   ```env
   VITE_API_URL="http://localhost:3000"
   ```

3. **Iniciar la aplicación cliente:**
   ```bash
   yarn dev
   ```
   *El cliente quedará disponible en `http://localhost:5173`.*

---

## 🔑 Credenciales de Prueba

La base de datos incluye los siguientes usuarios de demostración precargados mediante el `seed`:

Email | Contraseña |
:--- | :--- |
`ale@mail.com ` | `12345678` |
`luis@mail.com` | `12345678` |
`antonio@mail.com` | `12345678` |

---

## 📌 Notas
* Asegúrate de que el puerto PostgreSQL (`5432`) esté accesible.
* Asegúrate de que el backend (`http://localhost:3000`) y el frontend (`http://localhost:5173`) corran simultáneamente en terminales separadas.
* Las peticiones entre cliente y servidor incluyen `withCredentials: true` para la transmisión segura de cookies `HttpOnly`.
