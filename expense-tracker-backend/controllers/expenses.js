// Importamos el Router de Express y los modelos necesarios
const expensesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Expense = require('../models/expense')
const User = require('../models/user')

// Extrae el token del encabezado Authorization
const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Obtener todas las expenses
expensesRouter.get('/', async (req, res) => {
  try {
    // Busca todas las expenses y trae datos del usuario asociado
    const expenses = await Expense
      .find({})
      .populate('user', { username: 1, name: 1 })

    res.json(expenses)
  } catch (err) {
    // Error interno del servidor
    console.error(err.message)
    res.status(500).json({ error: 'Error al obtener las expenses' })
  }
})

// Obtener una expense por ID
expensesRouter.get('/:id', async (req, res) => {
  const expense = await Expense.findById(req.params.id)

  if (expense) {
    res.json(expense)
  } else {
    // Si no existe, devolvemos 404
    res.status(404).end()
  }
})

// Crear una nueva expense
expensesRouter.post('/', async (req, res) => {
  // Verificamos el token JWT
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  // Buscamos al usuario que creó la expense
  const user = await User.findById(decodedToken.id)

  // Creamos la nueva expense
  const expense = new Expense(req.body)
  expense.user = user._id

  // Guardamos la expense y la asociamos al usuario
  const savedExpense = await expense.save()
  user.expenses = user.expenses.concat(savedExpense._id)
  await user.save()

  res.status(201).json(savedExpense)
})

// Eliminar una expense por ID
expensesRouter.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = expensesRouter
