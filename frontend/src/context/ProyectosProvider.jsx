import { useEffect, useState, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

// Crear el context de los proyectos
const ProyectosContext = createContext()

const ProyectosProvider = ({ children }) => {
  // Proyectos del usuario autentificado
  const [proyectos, setProyectos] = useState([]) // Todos los proyectos del usuario
  const [alerta, setAlerta] = useState([])
  const [proyecto, setProyecto] = useState({}) // Cada proyecto individualmente
  const [cargando, setCargando] = useState(false)
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
  const [tarea, setTarea] = useState({}) // Tarea de cada proyecto

  const navigate = useNavigate()

  // Listar Proyectos
  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clienteAxios('/proyectos', config)
        setProyectos(data)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerProyectos()
  })

  // Alerta 
  const mostrarAlerta = alerta => {
    setAlerta(alerta)
    // Quitar la alerta
    setTimeout(() => {
      setAlerta({})
    }, 3500)
  }

  // Enviar formulario
  const submitProyecto = async proyecto => {
    if (proyecto.id) {
      await editarProyecto(proyecto) // Editar proyecto
    } else {
      await crearProyecto(proyecto) // Crear Proyecto
    }
    return
  }

  // Editar Proyecto
  const editarProyecto = async proyecto => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config) // Hacer la peticion
      // Sincronizar el state
      const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
      setProyectos(proyectosActualizados)

      // Mostrar Alerta Proyecto actualizado
      setAlerta({
        msg: 'Proyecto Editado correctamente',
        error: false
      })
      // Reedireción luego de actualizar un proyecto
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 2000)
    } catch (error) {

    }
  }

  // Crear Proyecto
  const crearProyecto = async proyecto => {
    // Control del flujo - manejo de exepciones
    try {
      // Autentificación del token
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post('/proyectos', proyecto, config) // Hacer la petición
      setProyectos([...proyectos, data]) // Hacer una copia de los proyectos y agregar el nuevo
      setAlerta({
        msg: 'Proyecto creado correctamente',
        error: false
      })
      // Reedireción luego de crear un proyecto
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  // Obtener cada proyecto
  const obtenerProyecto = async id => {
    setCargando(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios(`/proyectos/${id}`, config) // Hacer la peticion
      setProyecto(data)
    } catch (error) {
      console.log(error)
    } finally {
      setCargando(false)
    }
  }

  // Eliminar Proyecto
  const eliminarProyecto = async id => {
    try {
      // Autentificación del token
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config) // Hacer la peticion
      // Sincronizar el state
      const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
      setProyectos(proyectosActualizados)
      // Mostrar Alerta Proyecto eliminado
      setAlerta({
        msg: data.msg,
        error: false
      })
      // Reedireción luego de actualizar un proyecto
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  // ------------------------------ TAREAS --------------------------------
  // Abrir y cerrar modal
  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea)
    setTarea({})
  }

  // Envío del formulario (crear/editar tarea)
  const submitTarea = async tarea => {
    if (tarea?.id) { // si hay un id entonces editar
      await editarTarea(tarea)
    } else { // Si no crear   
      // Elimina el campo 'id' antes de enviarlo para crear una tarea
      const { id, ...tareaSinId } = tarea;  // eliminar el id al crear la tarea
      await crearTarea(tareaSinId)
    }
  }

  // Crear tarea
  const crearTarea = async tarea => {
    try {
      // Autentificación del token para crear tarea
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post('/tareas', tarea, config) // Petición a la api
      // Agregar la tarea al state
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = [...proyecto.tareas, data]
      setProyecto(proyectoActualizado)
      setAlerta({})
      setModalFormularioTarea(false) // Cerrar modal
    } catch (error) {
      console.log(error)
    }
  }

  // Editar Tarea 
  const editarTarea = async tarea => {
    try {
      // Autentificación del token para crear tarea
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
      // Actualizar el state
      const proyectoActualizado = {...proyecto}
      proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === data._id ? data : tareaState)
      setProyecto(proyectoActualizado)
      setAlerta({})
      setModalFormularioTarea(false) // Cerrar la modal
    } catch (error) {
      console.log("Error al editar tarea - desde el provider: " + error)
    }
  }

  // Editar Tarea
  const handleModalEditarTarea = tarea => {
    setTarea(tarea) // pasamos la tarea al state
    setModalFormularioTarea(true) // Abrir modal
  }
  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        setCargando,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
      }}>
      {children}
    </ProyectosContext.Provider>
  )
}

export {
  ProyectosProvider
}
export default ProyectosContext
