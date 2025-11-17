import { useState } from "react"

const LoginForm = ({ handleSubmit }) => {

    // Inputs del formulario de login
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    // Llamar función de login del padre
    const handleLogin = (event) => {
        event.preventDefault()
        handleSubmit({username, password})
        setUsername('')
        setPassword('')
    }

    return(
        // Contenedor centrado
        <div className="
                min-h-screen flex items-center justify-center bg-linear-to-br 
                from-blue-100 to-slate-100
            ">

            {/* Tarjeta de login */}
            <div className="
                bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm border border-slate-200
            ">
                <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
                Iniciar sesión
                </h2>

                {/* Formulario */}
                <form onSubmit={handleLogin} className="space-y-4">

                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                        Usuario
                    </label>
                    <input
                    data-testid="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="
                        w-full border border-slate-300 rounded-lg px-3 py-2 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:border-blue-500 transition
                    "/>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                        Contraseña
                    </label>
                    <input
                    data-testid="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="
                        w-full border border-slate-300 rounded-lg px-3 py-2 
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        focus:border-blue-500 transition
                    "/>
                </div>

                {/* Botón login */}
                <button
                    type="submit"
                    className="
                        w-full bg-blue-600 text-white font-semibold py-2 
                        rounded-lg hover:bg-blue-700 transition cursor-pointer
                    ">
                    Ingresar
                </button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm