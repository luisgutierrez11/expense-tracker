## 🚀 Expense Tracker – Frontend

Interfaz de usuario desarrollada con React + Vite, estilizada con Tailwind CSS, y conectada al backend mediante Axios.
Incluye pruebas unitarias con React Testing Library y pruebas E2E con Playwright.

## 🛠️ Tecnologías

React
Vite
Tailwind CSS
Axios
React Testing Library
Playwright (E2E)

## ▶️ Ejecutar en desarrollo

cd frontend
npm install
npm run dev

Frontend disponible en:
http://localhost:5173

## 🔧 Variables de entorno

Crear archivo .env o .env.local:

VITE_API_URL=http://localhost:3001

En producción reemplazar por la URL del backend desplegado.

## 🧪 Testing

Unitarias

npm test

E2E

npx playwright test
npx playwright test --ui

## 📦 Build de producción

npm run build

Los archivos finales quedarán en la carpeta dist/.

## 📚 Funcionalidades principales

Login
Crear gastos
Editar gastos
Eliminar gastos
Validaciones
UI responsive con Tailwind
