import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
// import axios from "axios"
import clienteAxios from "../config/clienteAxios"


// Nota: axios se utiliza para cominicarse con la api

const Registrar = () => {
  // Inicializar (definir) variables para registrar usuario
  const [nombre, setNombre] = useState('') // Nombre usuario
  const [email, setEmail] = useState('') // Correo electronico
  const [password, setPassword] = useState('') // Contraseña
  const [repetirPassword, setRepetirPassword] = useState('') // Repetir contraseña
  const [alerta, setAlerta] = useState({}) // Alerta

  // Envio del formulario
  const handleSubmit = async e => {
    e.preventDefault()
    // Validación de los campos
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Alerta: Todos los campos son obligatorios',
        error: true
      })
      return
    }
    // Validación contraseña
    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Alerta: Las contraseñas no son iguales ',
        error: true
      })
    }
    // Validación longitud de la contraseña
    if (password.length < 8) {
      setAlerta({
        msg: 'Alerta: La contraseña es muy corta, debe contener mínimo 8 carácteres ',
        error: true
      })
    }
    setAlerta({})

    // ------ Crear el usuario en la api ------
    // Control del flujo -  manejo de errores
    try {
      const { data } = await clienteAxios.post(`/usuarios`, {nombre, email, password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      // Limpiar formulario
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      // Alerta usuario ya existe
      setAlerta({
        msg: error.response.data.msg, 
        error: true
      })
    }
  }
  // Mensaje de la alerta 
  const { msg } = alerta

  return (
    <div>
      <>
        <h1 className="text-sky-600 font-black text-4xl text-center capitalize">Registrate y administra tus {' '}
          <span className="text-slate-700">proyectos</span>
        </h1>
        {msg && <Alerta alerta={alerta} />}
        {/* inicia formulario registro usuario */}
        <form
          className="my-10 bg-white shadow rounded-xl p-10"
          onSubmit={handleSubmit}> {/* envio de formulario */}
          {/* Nombre usuario*/}
          <div className="my-5">
            <label
              htmlFor="nombre"
              className="text-gray-600 block text-xl font-bold">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
              placeholder="Digita tu nombre" />
          </div>

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

          {/* Password usuario*/}
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
              onChange={e => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
              placeholder="Digita tu contraseña" />
          </div>

          {/* Repetir (confirmar) Password usuario*/}
          <div className="my-5">
            <label
              htmlFor="password2"
              className="text-gray-600 block text-xl font-bold">
              Repetir Contraseña:
            </label>
            <input
              type="password"
              id="password2"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
              placeholder="Digita tu contraseña" />
          </div>

          {/* boton registrarse */}
          <input
            className="w-full mb-5 mt-5 border-solid border-2 border-sky-700 text-sky-700 font-bold text-xl rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-sky-700 hover:text-white"
            type="submit"
            value="Registrarme"
          />
        </form>
        {/* termina formulario registro usuario */}

        {/* link para iniciar sesión */}
        <nav className="lg:flex lg:justify-between">
          <Link
            className='block text-center my-5 text-slate-500 text-base'
            to='/'>
            ¿Ya tienes una cuenta? {' '}
            <span className="text-sky-700 font-semibold hover:border-b-4 border-sky-700">
              Inicia sesión aquí
            </span>
          </Link>
        </nav>
      </>
    </div>
  )
}

export default Registrar
