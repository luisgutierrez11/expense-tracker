import { render, screen } from '@testing-library/react'
import ExpenseForm from '../../src/components/ExpenseForm'
import userEvent from '@testing-library/user-event'

test('<ExpenseForm /> updates parent state and calls onSubmit', async () => {
  // Mock: simula la función que el componente padre enviaría
  const createExpense = vi.fn()
  const user = userEvent.setup()

  render(<ExpenseForm createExpense={createExpense} />)

  // Inputs obtenidos por data-testid para evitar selects débiles
  const input1 = screen.getByTestId('new-description')
  const input2 = screen.getByTestId('new-amount')
  const selectElement = screen.getByRole('combobox')
  const sendButton = screen.getByText('save')

  // Simulación de escritura y selección
  await user.type(input1, 'testing a form...')
  await user.type(input2, '22')
  await user.selectOptions(selectElement, 'food')
  await user.click(sendButton)

  // Debe llamarse solo una vez
  expect(createExpense).toHaveBeenCalledTimes(1)

  // Debe recibir exactamente estos datos
  expect(createExpense).toHaveBeenCalledWith({
    description: 'testing a form...',
    amount: 22,
    category: 'food'
  })
})