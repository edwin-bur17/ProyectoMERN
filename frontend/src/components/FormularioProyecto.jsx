import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioProyecto = () => {
  const [id, setId] = useState(null) // Id proyecto
  const [nombre, setNombre] = useState('') // Nombre proyecto
  const [descripcion, setDescripcion] = useState('') // Descripcion proyecto
  const [fechaEntrega, setFechaEntrega] = useState('') // Fecha entrega proyecto
  const [cliente, setCliente] = useState('') // Cliente proyecto

  // Extraer de ProyectosProvider
  const {mostrarAlerta, alerta, submitProyecto} = useProyectos()

  // Envio del formulario
  const handleSubmit = async e => {
    e.preventDefault()

    // Validacion
    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    // Pasar datos hacia el provider
    await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')
  }
  // Extraer alerta
  const { msg } = alerta
  return (
    <form 
    onSubmit={handleSubmit}
    className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
      {/* nombre proyecto */}
      {msg && <Alerta alerta={alerta}/>}
      <div className="mb-5">
        <label htmlFor="nombre" className="text-gray-700 font-bold text-base">Nombre Proyecto:</label>
        <input type="text" 
        id="nombre"
        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg focus:outline-none focus:border-sky-700 focus:ring-sky-700"
        placeholder="Nombre del proyecto"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        />
      </div>
      {/* descripcion proyecto */}
      <div className="mb-5">
        <label htmlFor="descripcion" className="text-gray-700 font-bold text-base">Descripción Proyecto:</label>
        <textarea type="text" 
        id="descripcion"
        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg focus:outline-none focus:border-sky-700 focus:ring-sky-700"
        placeholder="Descripcion del proyecto"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        > </textarea>
      </div>
      {/* fecha entrega proyecto */}
      <div className="mb-5">
        <label htmlFor="fechaEntrega" className="text-gray-700 font-bold text-base">Fecha Entrega Proyecto:</label>
        <input type="date" 
        id="fechaEntrega"
        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg focus:outline-none focus:border-sky-700 focus:ring-sky-700"
        placeholder="Nombre del proyecto"
        value={fechaEntrega}
        onChange={e => setFechaEntrega(e.target.value)}
        />
      </div>
      {/* cliente proyecto */}
      <div className="mb-5">
        <label htmlFor="cliente" className="text-gray-700 font-bold text-base">Cliente Proyecto:</label>
        <input type="text" 
        id="cliente"
        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg focus:outline-none focus:border-sky-700 focus:ring-sky-700"
        placeholder="Nombre del proyecto"
        value={cliente}
        onChange={e => setCliente(e.target.value)}
        />
      </div>
      <input type="submit" value="Crear Proyecto" className="bg-sky-600 p-3 w-full font-bold text-white rounded-full cursor-pointer hover:bg-sky-700 transition-colors text-lg"/>
    </form>
  )
}

export default FormularioProyecto
