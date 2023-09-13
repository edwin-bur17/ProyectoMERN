import { useEffect, useState, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

// Crear el context de los proyectos
const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    // Proyectos del usuario autentificado
    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState([])

    const mostrarAlerta = alerta => {
      setAlerta(alerta)
      // Quitar la alerta
      setTimeout(() => {
        setAlerta({})
      }, 5000)
    }
  return (
    <ProyectosContext.Provider
    value={{
        proyectos,
        mostrarAlerta,
        alerta
    }}>
        {children}
    </ProyectosContext.Provider>
  )
}

export{
    ProyectosProvider
} 
export default ProyectosContext
