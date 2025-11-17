const ExpenseItem = ({ ex, handleDelete }) => {
    return(
        // Cada gasto individual
        <li data-testid='ex-test' className="
                flex justify-between items-center bg-white border border-slate-200 
                rounded-xl p-4 shadow-sm hover:shadow-md transition
        ">
            {/* Información del gasto */}
            <div>
                <p className="font-semibold text-slate-700">{ex.description}</p>
                <p className="text-sm text-slate-500">
                {ex.category} — ${ex.amount.toFixed(2)} —{" "}
                {new Date(ex.date).toLocaleDateString()}
                </p>
            </div>

            {/* Botón de eliminar */}
            <button
                onClick={handleDelete}
                className="
                    bg-red-500 text-white font-bold w-8 h-8 flex items-center 
                    justify-center rounded-full hover:bg-red-600 transition cursor-pointer
                ">
                    ×
            </button>
        </li>
    )
}

export default ExpenseItem