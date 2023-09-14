import PreviewProyecto from "../components/PreviewProyecto"
import useProyectos from "../hooks/useProyectos"

//  los proyectos del usuario
const Proyectos = () => {
  const { proyectos } = useProyectos()
  return (
    <>
      <h1 className="text-center text-4xl text-blue-500 font-semibold">Proyectos</h1>
      <div className="mt-10 grid grid-cols-2 gap-4">
        {/* itera los proyectos del usuario */}
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
          : <p className="text-center text-gray-6000">No hay proyectos</p>}
      </div>

    </>
  )
}

export default Proyectos
