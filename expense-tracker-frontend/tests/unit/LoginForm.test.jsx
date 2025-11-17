import { render, screen, waitFor } from '@testing-library/react'
import LoginForm from '../../src/components/LoginForm'
import userEvent from '@testing-library/user-event'

test('<LoginForm /> updates parent state and calls onSubmit', async () => {
  // Simula la lógica de login enviada por el componente padre
  const handleLogin = vi.fn()
  const user = userEvent.setup()

  render(<LoginForm handleSubmit={handleLogin} />)

  const input1 = screen.getByTestId('username')
  const input2 = screen.getByTestId('password')
  const sendButton = screen.getByText('Ingresar')

  // Simulamos tipeo y clic de envío
  await user.type(input1, 'User Test')
  await user.type(input2, 'PassTest')
  await user.click(sendButton)

  console.log(handleLogin.mock.calls)

  // Se evalúa dentro de waitFor porque el submit es async
  await waitFor(() => {
    expect(handleLogin).toHaveBeenCalledTimes(1)
    expect(handleLogin).toHaveBeenCalledWith({
        username: 'User Test',
        password: 'PassTest'
    })
  })
})