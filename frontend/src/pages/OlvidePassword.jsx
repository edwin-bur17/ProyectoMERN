import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import axios from "axios"

const OlvidePassword = () => {
  const [email, setEmail] = useState('') // Correo electrónico
  const [alerta, setAlerta] = useState({}) // Alerta

  // Envio del formulario
  const handleSubmit = async e => {
    e.preventDefault()
    // Validación del formulario
    if (email === '' || email.length < 6) {
      setAlerta({
        msg: 'El correo electrónico es obligatorio',
        error: true
      })
      return
    }
    // Control del flujo - manejo de errores
    try {
      // Hacer la petición (post)
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`, { email })
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  // Extraer el mensaje
  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center capitalize">Recupera tu cuenta y no pierdas tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      {/* inicia formulario olvide contraseña */}
      <form
        className="my-10 bg-white shadow rounded-xl p-10 "
        onSubmit={handleSubmit}>
        {/* Email */}
        <div className="my-5">
          <label
            htmlFor="email"
            className="text-gray-600 block text-xl font-bold">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
            placeholder="Digita tu correo electrónico" />
        </div>

        {/* boton enviar instrucciones */}
        <input
          className="w-full mb-5 mt-8 border-solid border-2 border-sky-700 text-sky-700 font-bold text-xl rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-sky-700 hover:text-white"
          type="submit"
          value="Enviar Instrucciones"
        />
        {/* <input
          className="w-full bg-sky-700 text-white font-bold text-xl rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-white hover:border-solid border-2 border-sky-700 hover:text-sky-700"
          type="submit"
          value="Iniciar Sesión"
        /> */}

      </form>
      {/* termina formulario olvide contraseña */}

      {/* link para registrarse */}
      <nav className="lg:flex lg:justify-between">
        <Link
          className='block text-center my-5 text-slate-500 text-sm'
          to='/'>
          ¿Ya tienes una cuenta? {' '}
          <span className="text-sky-700 font-semibold hover:border-b-4 border-sky-700">
            Iniciar sesión
          </span>
        </Link>

        <Link
          className='block text-center my-5 text-slate-500 text-sm'
          to='/registrar'>
          ¿No tienes una cuenta? {' '}
          <span className="text-sky-700 font-semibold hover:border-b-4 border-sky-700">
            Registrarme
          </span>
        </Link>
      </nav>
    </>
  )
}

export default OlvidePassword
