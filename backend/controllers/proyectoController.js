import Proyecto from "../models/Proyecto.js"

// Obtener un proyecto
const obtenerProyectos = async (req, res) =>{
    // Obtener los proyectos del usuario autenticado al momento de la consulta
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario) 

    res.json(proyectos) // respuesta json
}

// Crear NUevo proyecto
const nuevoProyecto = async (req, res) =>{
    const proyecto = new Proyecto(req.body) // Nuevo proyecto
    proyecto.creador = req.usuario._id // creador

    try {
        const proyectoAlmacenado = await proyecto.save() // Guardar proyecto
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

// Obtener un Proyecto
const obtenerProyecto = async (req, res) =>{
    const { id } = req.params
    
    const proyecto = await Proyecto.findById(id) // Buscar proyecto por el id


    if(!proyecto){ // Si no hay proyecto
        const error = new Error("Proyecto No Encontrado")
        return res.status(404).json({msg: error.message})
    }

    // Verificar que el proyecto sea del usuario autenticado
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida")
        return res.status(404).json({msg: error.message})
    }

    res.json(proyecto)
}

// Editar Proyecto
const editarProyecto = async (req, res) =>{
    const { id } = req.params
    
    const proyecto = await Proyecto.findById(id) // Buscar proyecto por el id


    if(!proyecto){ // Si no hay proyecto
        const error = new Error("Proyecto No Encontrado")
        return res.status(404).json({msg: error.message})
    }

    // Verificar que el proyecto sea del usuario autenticado
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida")
        return res.status(404).json({msg: error.message})
    }

    // Si no hay cambios, deja como está en la DB
    proyecto.nombre = req.body.nombre || proyecto.nombre
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
    proyecto.cliente = req.body.cliente || proyecto.cliente

    // Control del flujo - Manejo de Errores
    try {
        const proyectoAlmacenado = await proyecto.save() // Guardar los cambios
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const eliminarProyecto = async (req, res) =>{
    const { id } = req.params
    
    const proyecto = await Proyecto.findById(id) // Buscar proyecto por el id


    if(!proyecto){ // Si no hay proyecto (si ya ha sido eliminado o no ha sido creado aún)
        const error = new Error("Proyecto No Encontrado")
        return res.status(404).json({msg: error.message})
    }

    // Verificar que el proyecto sea del usuario autenticado
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida")
        return res.status(404).json({msg: error.message})
    }

    // Control del flujo - Manejo de errores
    try {
        await proyecto.deleteOne() // Eliminar proyecto
        const error = new Error("Proyecto eliminado")
        return res.status(404).json({msg: error.message})
    } catch (error) {
        console.log(error)
    }
}
















const agregarColaborador = async (req, res) =>{
    
}
const eliminarColaborador = async (req, res) =>{
    
}
const obtenerTareas = async (req, res) =>{
    
}

export{
    obtenerProyectos,
    obtenerProyecto,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas,
}