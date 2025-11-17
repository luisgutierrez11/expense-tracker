const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const expenseRouter = require('./controllers/expenses')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const testingRouter = require('./controllers/testing')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

// Configura Mongoose para evitar warnings del modo estricto
mongoose.set('strictQuery', false)

// Intento de conexión a MongoDB Atlas utilizando la URI del archivo de configuración
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB:', err.message)
  })



// Middleware para convertir automáticamente JSON en objetos JS
app.use(express.json())

// Habilita CORS para permitir que el frontend acceda al backend
app.use(cors())

// Middleware personalizado para registrar las solicitudes entrantes
app.use(middleware.requestLogger)

// Ruta raíz opcional (útil al entrar al backend desde el navegador)
app.get('/',(req, res) => {
    res.send("Bienvenido a la API de Seguimiento de Gastos 🚀")
})

// Rutas principales del proyecto (controlador de contactos, users y login)
app.use('/api/expenses', expenseRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


// Ruta alterna para cuando el servidor se inicia en modo 'test' 
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// Middleware para manejar errores lanzados por rutas o controladores
app.use(middleware.errorHandler)

// Middleware que responde si la ruta no existe
app.use(middleware.unknownEndpoint)

module.exports = app
