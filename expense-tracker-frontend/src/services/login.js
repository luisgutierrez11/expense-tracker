import axios from 'axios'

const baseUrl = '/api/login'

// Envía credenciales al backend para obtener el token y datos del usuario
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }