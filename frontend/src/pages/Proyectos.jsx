import PreviewProyecto from "../components/PreviewProyecto"
import useProyectos from "../hooks/useProyectos"

//  los proyectos del usuario
const Proyectos = () => {
  const { proyectos } = useProyectos()
  return (
    <>
      <h1 className="text-center text-4xl text-sky-600 font-bold">Mis Proyectos</h1>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {/* itera los proyectos del usuario */}
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
          : <h3 className="text-2xl text-gray-600">Aún no tienes proyectos</h3>}
      </div>

    </>
  )
}
export default Proyectos
