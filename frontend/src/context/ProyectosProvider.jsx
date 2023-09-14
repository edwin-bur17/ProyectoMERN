import { useEffect, useState, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

// Crear el context de los proyectos
const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    // Proyectos del usuario autentificado
    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState([])
    const [proyecto, setProyecto] = useState({})

    const navigate = useNavigate()

    // Listar Proyectos
    useEffect(() => {
      const obtenerProyectos = async () => {
        try {
          const token = localStorage.getItem('token')
        if(!token)return
        const config = {
          headers:{
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
      }, 5000)
    }

    // Crear proyectos
    const submitProyecto = async proyecto =>{
      // Control del flujo - manejo de exepciones
      try {
        const token = localStorage.getItem('token')
        if(!token)return
        const config = {
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const {data} = await clienteAxios.post('/proyectos', proyecto, config) // Hacer la petición
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
      try {
        const token = localStorage.getItem('token')
        if(!token)return
        const config = {
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clienteAxios(`/proyectos/${id}`, config) // Hacer la peticion
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <ProyectosContext.Provider
    value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto
    }}>
        {children}
    </ProyectosContext.Provider>
  )
}

export{
    ProyectosProvider
} 
export default ProyectosContext
