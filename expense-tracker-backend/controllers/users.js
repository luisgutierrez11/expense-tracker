const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

// Obtener todos los usuarios
userRouter.get('/', async (req, res) => {
  // populate trae todas las expenses relacionadas con cada usuario
  const users = await User.find({}).populate('expenses')

  res.json(users)
})

// Crear un nuevo usuario
userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  // Encriptamos la contraseña
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Creamos el usuario
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

// Eliminar un usuario por id (aunque no está siendo usado actualmente)
userRouter.delete('/', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = userRouter
