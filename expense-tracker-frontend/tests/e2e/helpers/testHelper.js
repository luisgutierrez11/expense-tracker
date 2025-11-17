import axios from "axios"

export const API_URL = 'http://localhost:3001'
export const FRONT_URL = 'http://localhost:5173'

export const testUser = {
  username: 'testuser',
  name: 'Test User',
  password: 'testpass'
}

/**
 * Resetea la base de datos y crea un usuario de prueba
 * (solo funciona si el backend tiene /api/testing/reset habilitado
 * y si el modo es NODE_ENV=test)
 */
// Instancia de axios preconfigurada
export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Función para resetear DB
export const resetTestDB = async () => {
  await api.post('/api/testing/reset')
};

// Función para crear usuario
export const createTestUser = async () => {
  await api.post('/api/users', testUser)
}
