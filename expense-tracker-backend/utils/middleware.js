const logger = require('./logger')

// Middleware que registra cada solicitud HTTP recibida.
// Útil para debugging mientras se desarrolla la API.
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
}

// Middleware para manejar solicitudes a rutas inexistentes.
// Responde con estado 404 y un mensaje en formato JSON.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Middleware general de manejo de errores.
// Detecta distintos tipos de errores de MongoDB, Mongoose y JWT,
// y envía respuestas adecuadas al cliente.
const errorHandler = (error, request, response, next) => {

  // Registra el error en consola (excepto en tests)
  logger.error(error.message)

  // Error al intentar acceder a un ID malformado (por ejemplo, demasiado corto)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  
  // Error de validación en MongoDB/Mongoose
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })

  // Error de clave única duplicada (por ejemplo: username ya existente)
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })

   // Error relacionado con token JWT inválido
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })

  // Token expirado
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  // Si no se reconoce el tipo de error, se delega al controlador siguiente
  next(error)
}

// Exporta todos los middlewares
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}