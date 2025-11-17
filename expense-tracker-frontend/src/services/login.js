import axios from 'axios'

// const baseUrl = '/api/login'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Envía credenciales al backend para obtener el token y datos del usuario
const login = async credentials => {
  const response = await api.post('/api/login', credentials)
  return response.data
}

export default { login }