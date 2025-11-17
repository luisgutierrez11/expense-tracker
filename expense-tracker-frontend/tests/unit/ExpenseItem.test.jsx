import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExpenseItem from '../../src/components/ExpenseItem'

test('renders description', () => {
  // Gasto de prueba para renderizar el componente
  const ex = {
    description: 'Salidita con amigos',
    amount: 15,
    category: 'food',
    date: new Date()
  }

  render(<ExpenseItem ex={ex} />)

  // Identificamos el contenedor del gasto
  const element = screen.getByTestId(`ex-test`);  

  screen.debug(element)

  // Verificamos que el componente se renderizó
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const expense = {
    description: 'Salidita con amigos',
    amount: 15,
    category: 'food',
    date: new Date()
  }

  // Mock de función para eliminar gasto
  const mockHandler = vi.fn()

  render(
    <ExpenseItem ex={expense} handleDelete={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('×')

  // Simulamos clic en el botón de eliminación
  await user.click(button)

  // Debe llamarse exactamente una vez
  expect(mockHandler.mock.calls).toHaveLength(1)
})