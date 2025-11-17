const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Expense = require('../models/expense')
const User = require('../models/user')

// Conjunto de pruebas relacionadas con expenses
describe('when there is initially some expenses saved', () => {

  // Antes de cada test, reseteamos BD y cargamos datos iniciales
  beforeEach(async () => {
    await Expense.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)

    // Crear usuario inicial
    const user = new User({
      _id: helper.initialUser._id,
      username: helper.initialUser.username,
      passwordHash
    })
    await user.save()

    // Crear token válido para usar en los tests
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.SECRET,
      { expiresIn: '1h' }
    )
    global.authToken = token

    // Insertar las expenses iniciales para las pruebas
    await Expense.insertMany(helper.initialExpenses)
  })

  test('expenses are returned as json', async () => {
    await api
      .get('/api/expenses')
      .expect(200)
      .expect('Content-Type', /application\/json/) // Debe devolver JSON
  })

  test('all expenses are returned', async () => {
    const response = await api.get('/api/expenses')

    // La cantidad devuelta debe ser igual a la inicial
    assert.strictEqual(response.body.length, helper.initialExpenses.length)
  })

  test('a specific expense is within the returned expenses', async () => {
    const response = await api.get('/api/expenses')

    const descriptions = response.body.map(r => r.description)
    assert(descriptions.includes('Viaje a Cuesta Blanca'))
  })

  // Pruebas relacionadas con obtener un gasto por ID
  describe('viewing a specific expense', () => {

    test('succeeds with a valid id', async () => {
      const expensesAtStart = await helper.expensesInDb()
      const expenseToView = expensesAtStart[0]

      // Convertimos fecha a string ISO para comparar correctamente
      const expenseToViewStr = {
        ...expenseToView,
        date: expenseToView.date.toISOString()
      }

      const resultExpense = await api
        .get(`/api/expenses/${expenseToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultExpense.body, expenseToViewStr)
    })

    test('fails with statuscode 404 if expense does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/expenses/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/expenses/${invalidId}`)
        .expect(400)
    })
  })

  // Crear nuevas expenses
  describe('addition of a new expense', () => {

    test('succeeds with valid data', async () => {
      const newExpense = {
        description: 'Salidita con los pibes',
        category: 'entertainment',
        amount: 70
      }

      await api
        .post('/api/expenses')
        .set('Authorization', `Bearer ${global.authToken}`) // Token requerido
        .send(newExpense)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const expensesAtEnd = await helper.expensesInDb()
      assert.strictEqual(expensesAtEnd.length, helper.initialExpenses.length + 1)

      const descriptions = expensesAtEnd.map(ex => ex.description)
      assert(descriptions.includes('Salidita con los pibes'))
    })

    test('fails with status code 400 if data invalid', async () => {
      // Falta description → inválido
      const newExpense = {
        amount: 100
      }

      await api
        .post('/api/expenses')
        .set('Authorization', `Bearer ${global.authToken}`)
        .send(newExpense)
        .expect(400)

      const expensesAtEnd = await helper.expensesInDb()

      // Nada debería haberse agregado
      assert.strictEqual(expensesAtEnd.length, helper.initialExpenses.length)
    })
  })

  // Borrar expenses
  describe('deletion of a expense', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const expensesAtStart = await helper.expensesInDb()
      const expenseToDelete = expensesAtStart[0]

      await api
        .delete(`/api/expenses/${expenseToDelete.id}`)
        .set('Authorization', `Bearer ${global.authToken}`)
        .expect(204)

      const expensesAtEnd = await helper.expensesInDb()

      assert.strictEqual(expensesAtEnd.length, helper.initialExpenses.length - 1)

      const descriptions = expensesAtEnd.map(r => r.description)
      assert(!descriptions.includes(expenseToDelete.description))
    })
  })

  test('fails with status code 401 if token is missing', async () => {
    const newExpense = {
      description: 'Gasto no autorizado',
      category: 'misc',
      amount: 20
    }

    await api
      .post('/api/expenses')
      .send(newExpense)
      .expect(401) // No token → no autorizado
  })
})

// Cerramos la conexión a la BD al terminar todas las pruebas
after(async () => {
  await mongoose.connection.close()
})
