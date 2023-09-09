import { Link } from "react-router-dom"

const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center capitalize">Reestablece tu contraseña y no pierdas tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {/* inicia formulario nueva contraseña */}
      <form className="my-10 bg-white shadow rounded-xl p-10 ">
        {/* Password */}
        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-600 block text-xl font-bold">
            Nueva Contraseña:
          </label>
          <input
            type="password"
            id="password"
            className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
            placeholder="Digita tu nueva contraseña" />
        </div>

        {/* boton nueva contraseña */}
        <input
          className="w-full mb-5 mt-8 border-solid border-2 border-sky-700 text-sky-700 font-bold text-xl rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-sky-700 hover:text-white"
          type="submit"
          value="Guardar Nueva Contraseña"
        />
      </form>
      {/* termina formulario nueva contraseña */}
    </>
  )
}

export default NuevoPassword
