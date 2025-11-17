import { useState } from "react"

const ExpenseForm = ({createExpense}) => {

    // Estados locales del formulario
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')

    // Categorías permitidas por el backend
    const categories = ["food", "transport", "entertainment", "health", "other"]

    // Manejo del submit del formulario
    const addExpense = (event) => {
        event.preventDefault()
        createExpense({
            description,
            category,
            amount: Number(amount)
        })
        // Resetear inputs
        setDescription('')
        setCategory('')
        setAmount('')
    }

    return(
        <div className="bg-white shadow-md rounded-xl p-6 mt-6 border border-slate-200">
            <h3 className="font-semibold text-lg text-slate-700 mb-4 text-center">
                Agregar gasto
            </h3>

            {/* Formulario controlado */}
            <form 
                onSubmit={addExpense} 
                className="flex flex-col gap-3 max-w-md mx-auto bg-white shadow p-4 rounded-xl"
            >
                {/* Input descripción */}
                <div className="flex flex-col text-left">
                    <label>description:</label>
                    <input 
                        className="
                            border border-slate-300 rounded-lg px-3 py-2 w-full md:w-auto 
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                        data-testid='new-description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>

                {/* Selector categoría */}
                <div className="flex flex-col text-left">
                    <label>category:</label>
                    <select
                        className="
                            border border-slate-300 rounded-lg px-3 py-2 w-full md:w-auto 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
                        "
                        data-testid="new-category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        required
                    >
                        <option value="">-- Select a category --</option>
                        {categories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* Input monto */}
                <div className="flex flex-col text-left">
                </div>
                    <label>amount:</label>
                    <input 
                        className="
                            border border-slate-300 rounded-lg px-3 py-2 w-full md:w-auto 
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                        data-testid='new-amount'
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                        required
                />

                {/* Botón guardar */}
                <button 
                    type="submit" 
                    className="
                        bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 
                        transition cursor-pointer
                    ">
                        save
                </button>
            </form>
        </div>
    )
}

export default ExpenseForm