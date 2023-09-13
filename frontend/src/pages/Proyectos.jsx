import useProyectos from "../hooks/useProyectos"

const Proyectos = () => {
  const { proyectos } = useProyectos()
  console.log(proyectos)
  return (
    <>
      <h1 className="text-center text-4xl text-blue-500 font-semibold">Proyectos</h1>  
    </>
  )
}

export default Proyectos
