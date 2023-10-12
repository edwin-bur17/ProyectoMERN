import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState('') // Correo electrónico
  const [password, setPassword] = useState('') // Contraseña
  const [alerta, setAlerta] = useState({}) // Alerta

  const { setAuth } = useAuth() // Autentificación del usuario

  const navigate = useNavigate() // Reedirección de las páginas

  // Envio del formulario login
  const handleSubmit = async e => {
    e.preventDefault()

    // Validación
    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
        
      })
      // Quitar la alerta
      setTimeout(() => {
        setAlerta({})
      }, 5000)
      return
    }
    // Control de errores - manejo de exepciones
    try {
      const { data } =await clienteAxios.post('/usuarios/login', {email, password})
      setAlerta({})
      localStorage.setItem('token', data.token) // Guardar el token em localstorage
      setAuth(data)
      navigate('/proyectos') // Reedireccionar a los proyectos si la autentificación es correcta
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg, // Alerta de error
        error: true
      })
    }
  }
  // Extarer la alerta
  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center capitalize">Inicia sesión y administra tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/> } 

      {/* inicia formulario login */}
      <form 
      onSubmit={handleSubmit}
      className="my-10 bg-white shadow rounded-xl p-10 ">
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
            onChange={ e => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
            placeholder="Digita tu correo electrónico" />
        </div>

        {/* Password */}
        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-600 block text-xl font-bold">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={ e => setPassword(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
            placeholder="Digita tu contraseña" />
        </div>

        {/* boton iniciar sesión */}
        <input
          className="w-full mb-5 mt-9 border-solid border-2 border-sky-700 text-sky-700 font-bold text-xl rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-sky-700 hover:text-white"
          type="submit"
          value="Iniciar Sesión"
        />
        {/* <input
          className="w-full bg-sky-700 text-white font-bold text-xl rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-white hover:border-solid border-2 border-sky-700 hover:text-sky-700"
          type="submit"
          value="Iniciar Sesión"
        /> */}

      </form>
      {/* termina formulario login */}

      {/* link para registrarse */}
      <nav className="lg:flex lg:justify-between">
        <Link
          className='block text-center my-5 text-slate-500 text-base'
          to='/registrar'>
          ¿No tienes una cuenta? {' '}
          <span className="text-sky-600 font-semibold hover:text-sky-800">
            Registrate aquí
          </span>
        </Link>

        {/* link para recuperar contraseña */}
        <Link
          className='block text-center my-5 text-slate-500 font-semibold hover:text-slate-700  '
          to='/olvide-password'>
          Olvidé mi contraseña 
        </Link>
      </nav>
    </>
  )
}

export default Login
