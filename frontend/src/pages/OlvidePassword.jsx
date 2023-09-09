import { Link } from "react-router-dom"

const OlvidePassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center capitalize">Recupera tu cuenta y no pierdas tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {/* inicia formulario olvide contraseña */}
      <form className="my-10 bg-white shadow rounded-xl p-10 ">
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
