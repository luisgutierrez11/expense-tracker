const test = require('node:test')
const assert = require('node:assert')
const { totalExpenses } = require('../utils/list_helper')

// Test unitario simple de lógica pura sin BD
test('calculates total amount of expenses', () => {
  const expenses = [
    { description: 'Food', amount: 20 },
    { description: 'Transport', amount: 10 },
    { description: 'Coffee', amount: 5 }
  ]

  const result = totalExpenses(expenses)

  assert.strictEqual(result, 35)
})

