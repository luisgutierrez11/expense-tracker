import axios from 'axios'
// const baseUrl = '/api/expenses'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})


// Token JWT que se setea luego del login
let token = null

// Permite guardar el token en memoria para usarlo en las requests privadas
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Obtener todos los gastos (ruta pública en este caso, depende del backend)
const getAll = async () => {
  const response = await api.get('/api/expenses')
  return response.data
}

// Crear un nuevo gasto (requiere token JWT)
const create = async newObject => {
  const config = {
      headers: { Authorization: token },
  }

  const response = await api.post('/api/expenses', newObject, config)
  return response.data
}

// Editar un gasto por ID (requiere token JWT)
// const update = async (id, newObject) => {
//   const response = axios.put(`${baseUrl}/${id}`, newObject)
//   return response.data
// }

// Eliminar un gasto por ID (requiere token JWT)
const erase = async id => {
  const config = {
      headers: { Authorization: token },
  }

  const response = await api.delete(`/api/expenses/${id}`, config)
  return response.data
}

// Exportamos funciones necesarias para el resto de la app
export default { getAll, create, setToken, erase} // update