const mongoose = require('mongoose')

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,    // No pueden existir usuarios con el mismo username
    minLength: 4
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,  // Guardamos solo el hash de la contraseña
    minLength: 6
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense' // Relación: un usuario puede tener muchas expenses
    }
  ],
})

// Transformación de salida cuando se convierte a JSON
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id           // Ocultamos el _id original
    delete returnedObject.__v           // Ocultamos metadatos internos
    delete returnedObject.passwordHash  // ¡Nunca exponemos la contraseña!
  }
})

// Creamos el modelo
const User = mongoose.model('User', userSchema)

module.exports = User
