// Calcula el total gastado sumando todos los amounts
const totalExpenses = (expenses) => {
  return expenses.reduce((sum, exp) => sum + exp.amount, 0)
}

module.exports = { totalExpenses }
