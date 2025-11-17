const mongoose = require('mongoose')

// Definimos el esquema de una expense (gasto)
const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true  // La descripción es obligatoria
  },
  amount: {
    type: Number,
    required: true  // El monto es obligatorio
  },
  category: {
    type: String,
    enum: ['food', 'transport', 'entertainment', 'health', 'other'], // Categorías permitidas
    default: 'other'
  },
  date: {
    type: Date,
    default: Date.now   // Si no se envía fecha, usa la actual
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',        // Relación: cada expense pertenece a un usuario
    required: true
  }
})

// Configuramos cómo se transforma el documento cuando se envía como JSON
expenseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()  // Convertimos _id a string y lo renombramos
    delete returnedObject._id                         // Ocultamos _id original
    delete returnedObject.__v                         // Ocultamos la versión interna de Mongoose
  }
})

// Creamos el modelo a partir del esquema
const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
