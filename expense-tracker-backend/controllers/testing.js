const testingRouter = require('express').Router()
const Expense = require('../models/expense')
const User = require('../models/user')

// Borra todos los documentos de las colecciones Expense y User
testingRouter.post('/reset', async (req, res) => {
  await Expense.deleteMany({})
  await User.deleteMany({})

  // 204 → Operación exitosa sin contenido
  res.status(204).end()
})

module.exports = testingRouter
