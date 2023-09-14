import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"

// Proyecto (cada proyecto del usuario individualmente)
const Proyecto = () => {
    // Obtner el id del proyecto
    const params = useParams() 
    const {obtenerProyecto} = useProyectos()
   
    useEffect(() => {
        obtenerProyecto(params.id)
    })

  return (
    <div>
      <h2>proyecto individualmente</h2>
    </div>
  )
}

export default Proyecto
