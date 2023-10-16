import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "../components/Alerta"
import ModalFormularioTarea from "../components/ModalFormularioTarea"

// Proyecto ( vista de cada proyecto del usuario individualmente)
const Proyecto = () => {
  // Obtner el id del proyecto
  const params = useParams()
  const { obtenerProyecto, proyecto, cargando, eliminarProyecto, alerta, handleModalTarea } = useProyectos()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  const handleClick = () => {
    if (confirm('¿Deseas eliminar este Proyecto? Si eliminas este proyecto no lo podrás recuperar.')) {
      eliminarProyecto(params.id)
    } else {
      console.log('No')
    }
  }

  // Extraer alerta
  const { msg } = alerta

  const { nombre } = proyecto
  if (cargando) return 'Cargando...'
  return (
    <>
      <div className="p-6 bg-white rounded-xl overflow-hidden group">
        <div className="flex flex-col justify-between">
          <h1 className="font-black text-4xl">{nombre}</h1>
          <div>
            {msg && <Alerta alerta={alerta} />}
          </div>
          <div className="flex items-center justify-end">
            <Link
              className="p-3 mx-3 cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              to={`/proyectos/editar/${params.id}`}
              title="Editar Proyecto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </Link>
            <button
              onClick={handleClick}
              className="p-3 cursor-pointer bg-red-500 hover:bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              title="Eliminar Proyecto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>

        {/* agregar tarea */}
        <button
          type="button"
          onClick={handleModalTarea}
          className="text-base px-5 mt-5 py-3 md:auto rounded-lg font-bold bg-green-600 hover:bg-green-700 text-white text-center flex gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
          </svg>
          Agregar tarea
        </button>

      </div>
      <ModalFormularioTarea />
    </>
  )
}

export default Proyecto
