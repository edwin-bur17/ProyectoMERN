import { formatearFecha } from '../helpers/formatearFecha'
import useProyectos from '../hooks/useProyectos'

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos()
  const { descripcion, nombre, prioridad, fechaEntrega, estado, createdAt, _id } = tarea
  return (
    <div className='p-6 bg-white rounded-xl shadow-xl flex justify-between items-center'>
      <div>
        <p className="mb-1 text-2xl"> <span className='text-base text-gray-600'></span>Título: {nombre}</p>
        <p className="mb-1 text-lg text-black text-semibold">Descripción : <span className='text-base text-gray-600'>{descripcion}</span></p>
        <p className="mb-1 text-lg text-black text-semibold">Fecha de entrega: <span className='text-base text-gray-600'>{formatearFecha(fechaEntrega)}</span></p>
        <p className="mb-1 text-lg text-black text-semibold">Prioridad: <span className='text-base text-gray-600'>{prioridad}</span></p>
        <p className="mb-1 text-lg text-black text-semibold">Fecha de creación: <span className='text-base text-gray-600'>{formatearFecha(createdAt)}</span></p>
      </div>
      <div className='flex gap-2'>
        <button
          className='bg-indigo-600 px-4 py-3 text-white font-bold text-base rounded-lg hover:bg-indigo-700 transition-colors'
          onClick={() => handleModalEditarTarea(tarea)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </button>

        <button
          className='bg-red-500 px-4 py-3 text-white font-bold text-base rounded-lg hover:bg-red-600 transition-colors'
          onClick={() => handleModalEliminarTarea(tarea)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>

        {estado ? (
          <button className='bg-green-600 px-4 py-3 text-white font-bold text-base rounded-lg'>
            terminada
          </button>
        ) : (
          <button className='bg-gray-600 px-4 py-3 text-white font-bold text-base rounded-lg'>
            Incompleta
          </button>
        )}
      </div>
    </div>
  )
}

export default Tarea
