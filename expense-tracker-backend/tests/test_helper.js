const mongoose = require('mongoose')
const Expense = require('../models/expense')
const User = require('../models/user')

// Usuario inicial con ID estable para relacionar expenses
const initialUser = {
  _id: new mongoose.Types.ObjectId('652a1f9b9a0b123456789abc'),
  username: 'testuser',
}

// Gastos predefinidos para usar en beforeEach()
const initialExpenses = [
  {
    description: 'Viaje a Cuesta Blanca',
    category: 'transport',
    amount: 100,
    user: initialUser._id,
    date: new Date()
  },
  {
    description: 'Compra supermercado',
    category: 'food',
    amount: 250,
    user: initialUser._id,
    date: new Date()
  }
]

// Devuelve un ID válido pero sin documento (para probar 404)
const nonExistingId = async () => {
  const expense = new Expense({
    description: 'willremovethissoon',
    category: 'other',
    amount: 1,
    user: initialUser._id
  })

  await expense.save()
  await expense.deleteOne()

  return expense._id.toString()
}

// Devuelve todas las expenses de la BD en formato JSON
const expensesInDb = async () => {
  const expenses = await Expense.find({})
  return expenses.map(ex => {
    const e = ex.toJSON()
    e.user = e.user.toString() // Aseguramos consistencia
    return e
  })
}

// Devuelve todos los usuarios en formato JSON
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialExpenses,
  nonExistingId,
  expensesInDb,
  usersInDb,
  initialUser
}
