## 💸 Expense Tracker

Aplicación fullstack para gestionar gastos personales con autenticación, persistencia en la nube y pruebas automatizadas.
Permite crear, editar y eliminar gastos, iniciar sesión, y almacenar toda la información de forma segura en un backend con Node.js, Express y MongoDB Atlas.
El frontend está desarrollado con React + Tailwind CSS, y cuenta con pruebas unitarias y E2E.

## 🚀 Características principales

🔐 Registro e inicio de sesión
➕ Agregar gastos
📝 Editar gastos existentes
❌ Eliminar gastos
📦 Persistencia real en MongoDB Atlas
🔒 JWT para manejo de sesiones
🎨 UI con Tailwind CSS
🧪 Testing fullstack
├── Backend: pruebas unitarias e integración
└── Frontend: pruebas unitarias (componentes) y E2E con Playwright
🏗️ Arquitectura clara y escalable

## 🧱 Tecnologías utilizadas

Frontend:
React
Vite
Tailwind CSS
Axios
React Testing Library
Playwright (E2E)

Backend:
Node.js
Express
MongoDB Atlas
Mongoose
JSON Web Token (JWT)
bcrypt (hashing de contraseñas)
Jest + Supertest (unitarias e integración)

## 🗂️ Estructura del proyecto

expense-tracker
├── frontend
│ ├── src
│ ├── public
│ └── package.json
├── backend
│ ├── controllers
│ ├── models
│ ├── tests
│ ├── utils
│ └── package.json
└── README.md (este archivo)

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

git clone https://github.com/luisgutierrez11/expense-tracker.git

cd expense-tracker

### 2. Instalar dependencias

Frontend:
cd frontend
npm install

Backend:
cd backend
npm install

## ▶️ Cómo ejecutar el proyecto

Frontend

npm run dev
Corre en: http://localhost:5173

Backend

npm run dev (si usás nodemon)
o
npm start

Corre en:
http://localhost:3001

## 🔧 Variables de entorno (backend)

Crear un archivo .env dentro de /backend con:

PORT=3001
MONGODB_URI=tu_uri_atlas
SECRET=tu_secreto_para_jwt

(No es necesario instalar dotenv en el frontend.)

## 🧪 Testing

Backend

Pruebas unitarias
Pruebas de integración con Supertest

Comando:
npm test

Para iniciar una db alterna de pruebas para e2e:
npm run start:test

Frontend

Unitarias:
npm test

E2E con Playwright:
npx playwright test
npx playwright test --ui (modo gráfico)

Cubre:
Crear gasto
Editar gasto
Eliminar gasto
Login
Persistencia visual

## 🌐 Deploy

Frontend
Vercel / Netlify / Render (web service)

Backend
Render / Railway / Fly.io

Luego actualizar en el frontend:
VITE_API_URL=https://tu-backend.onrender.com/api

## 🚧 Roadmap / Próximas mejoras

Filtrar gastos por categoría
Ordenar por fecha o monto
Gráficos con Recharts
Modo oscuro
Registro para nuevos usuarios
Recuperación de contraseña
Exportar gastos a CSV/Excel
Edición de gastos

## 📄 Licencia

Este proyecto está bajo la licencia MIT — ver el archivo LICENSE para más detalles.

## 👤 Autor

Luis Gutiérrez
Desarrollador Web Fullstack
GitHub: https://github.com/luisgutierrez11
Email: luis.gut.11jm@gmail.com
