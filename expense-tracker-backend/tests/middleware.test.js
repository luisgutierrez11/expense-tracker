const test = require('node:test')
const assert = require('node:assert')
const { unknownEndpoint } = require('../utils/middleware')

test('unknownEndpoint returns 404 and json', () => {
  // Simulamos req y res
  const req = {}

  // Creamos mocks sencillos a mano (sin Jest)
  let statusCode = null
  let sendBody = null

  const res = {
    status(code) {
      statusCode = code
      return this
    },
    send(body) {
      sendBody = body
    }
  }

  unknownEndpoint(req, res)

  // Aserciones
  assert.strictEqual(statusCode, 404)
  assert.deepStrictEqual(sendBody, { error: 'unknown endpoint' })
})

