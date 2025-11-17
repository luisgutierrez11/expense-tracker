import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import ExpenseForm from './components/ExpenseForm'
import ExpenseItem from './components/ExpenseItem'
import expenseService from './services/expenses'
import loginService from './services/login'

const App = () => {
  // Estado global del frontend:
  // - expenses → lista de gastos cargados desde el backend
  // - user → usuario autenticado (si lo hay)
  const [expenses, setExpenses] = useState([])
  const [user, setUser] = useState(null)

  // Cargar gastos al montar la app (solo una vez)
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const initialExpenses = await expenseService.getAll()
        setExpenses(initialExpenses)
      } catch (err) {
        console.error("Error cargando gastos:", err.message)
      }
    }

    getExpenses()
  },[])

  // Revisar si hay un usuario logueado en localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedExpenseAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // Configurar token global para peticiones
      expenseService.setToken(user.token)
    }
  }, [])

  // Crear gasto nuevo (se envía al backend)
  const addExpense = async (expenseObject) => {
    try{
      const savedExpense = await expenseService.create(expenseObject)
      setExpenses(expenses.concat(savedExpense))
    }catch(err){
      console.error(err.message)
      // Si el token expiró → cerrar sesión
      err.response?.status === 401 && handleLogOut()
    }      
  }

  // Eliminar gasto
  const handleDelete = async id => {
    try{
      await expenseService.erase(id)
      setExpenses(expenses.filter(ex => ex.id !== id))
    } catch(err){
      console.error(err.message)
      err.response?.status === 401 && handleLogOut()
    }
  }

  // Log in → guarda token en localStorage y en servicio de gastos
  const handleLogin = async (loginObject) => {
    try{
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedExpenseAppUser', JSON.stringify(user)
      )
      expenseService.setToken(user.token)
      setUser(user)

    }catch(err){
      console.error(err.message)
    }
  }

  // Cerrar sesión → borrar localStorage + refrescar app
  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedExpenseAppUser')
    window.location.reload()
  }

  // Si no hay usuario, mostrar formulario de login
  if(!user){
    return <LoginForm handleSubmit={handleLogin} />
  }

  // Si está logueado → mostrar UI principal
  return (
    <div className="min-h-screen bg-amber-100 text-gray-800">

      {/* Header con usuario + botón de logout */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-wide">Expense Tracker</h1>
          <div className="flex items-center gap-4">
            <p>Bienvenido, {user.name}</p>
            <button
              onClick={handleLogOut}
              className="
                bg-white text-blue-600 font-semibold px-3 py-1.5 rounded-lg 
                hover:bg-slate-100 transition cursor-pointer
            ">
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal: formulario + lista de gastos */}
      <main className="max-w-3xl mx-auto p-4">
        <ExpenseForm createExpense={addExpense} />

        <ul className="mt-6 space-y-3">

          {/* Mensaje si no hay gastos */}
          {expenses.length === 0 ? (
            <p className="text-gray-600 text-center">
              No hay gastos registrados aún.
            </p>
          ) : (
            // Renderizar cada gasto
            expenses.map((ex) => (
              <ExpenseItem
                handleDelete={() => handleDelete(ex.id)}
                key={ex.id}
                ex={ex}
              />
            ))
          )}
        </ul>
      </main>
    </div>
  )
}

export default App
