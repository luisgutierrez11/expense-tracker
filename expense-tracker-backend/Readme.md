## 🧰 Expense Tracker – Backend

API REST construida con Node.js, Express y MongoDB Atlas.
Incluye autenticación con JWT, hashing con bcrypt y pruebas unitarias e integración con Jest + Supertest.

## 🛠️ Tecnologías

Node.js
Express
MongoDB Atlas
Mongoose
bcrypt
JSON Web Token (JWT)
Jest + Supertest

## ▶️ Ejecutar en desarrollo

cd backend
npm install
npm run dev
(usar nodemon si está configurado)

Backend disponible en:
http://localhost:3001

## 🔧 Variables de entorno

Crear archivo .env:

PORT=3001
MONGODB_URI=tu_uri_de_mongodb_atlas
SECRET=tu_secreto_para_jwt

## 🧪 Testing

npm test

Incluye:
Pruebas unitarias
Pruebas de integración de rutas (Supertest)
Mocking de base de datos

## 📚 Endpoints principales

POST /api/login
GET /api/expenses
POST /api/expenses
PUT /api/expenses/:id
DELETE /api/expenses/:id

## 📦 Producción

npm start
