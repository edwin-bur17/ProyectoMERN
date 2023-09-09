import { Link } from "react-router-dom"

const Registrar = () => {
  return (
    <div>
      <>
        <h1 className="text-sky-600 font-black text-4xl text-center capitalize">Registrate y administra tus {' '}
          <span className="text-slate-700">proyectos</span>
        </h1>

        {/* inicia formulario registro usuario */}
        <form className="my-10 bg-white shadow rounded-xl p-10 ">
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
