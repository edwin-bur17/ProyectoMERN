import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import FormularioProyecto from "../components/FormularioProyecto"
import { useEffect } from "react"

const EditarProyecto = () => {
    const params = useParams()
    const { obtenerProyecto, proyecto, cargando } = useProyectos()
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])
    const { nombre } = proyecto
    if (cargando) return 'Cargando...'
    return (
        <>
            <h1 className="text-center text-4xl text-sky-600 font-bold">Editar Proyectos</h1>
            <h3 className="text-center font-normal">Proyecto:{' '} {proyecto.nombre}</h3>
            <div className="mt-10 flex justify-center">
                <FormularioProyecto />
            </div>
        </>
    )
}

export default EditarProyecto
