import FormularioProyecto from "../components/FormularioProyecto"

const NuevoProyecto = () => {
  return (
    <>
     <h1 className="text-center text-4xl text-sky-600 font-semibold">Crear proyecto</h1>
     <div className="mt-10 flex justify-center">
      <FormularioProyecto/>
     </div>
    </>
  )
}

export default NuevoProyecto
