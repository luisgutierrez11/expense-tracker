const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// Endpoint para iniciar sesión
loginRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body

    // Buscamos al usuario por su username
    const user = await User.findOne({ username })

    // Verificamos que exista y que la contraseña sea correcta
    const passwordCorrect =
      user && await bcrypt.compare(password, user.passwordHash)

    if (!user || !passwordCorrect) {
      return res.status(401).json({ error: 'invalid username or password' })
    }

    // Información que se almacenará dentro del token
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    // Firmamos el token con vencimiento de 1 hora
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60
    })

    // Devolvemos el token y datos básicos del usuario
    res.status(200).json({
      token,
      username: user.username,
      name: user.name,
      id: user._id
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'internal server error' })
  }
})

module.exports = loginRouter
