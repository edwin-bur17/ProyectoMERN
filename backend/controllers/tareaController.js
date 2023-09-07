import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"

// Crear Nueva Tarea
const agregarTarea = async (req, res) =>{
    const { proyecto } = req.body

    // Buscar si el proyecto existe
    const existeProyecto = await Proyecto.findById(proyecto)
    
    // Validación del proyecto
    if (!existeProyecto) { // si no existe
        const error = new Error("El proyecto no Existe")
        return res.status(404).json({msg: error.message})
    }

    // Verificar si el usuario que crea la tarea sea el mismo usuario que creó el proyecto
    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) { // si no es el mismo
        const error = new Error("No tienes los permisos para añadir tareas") // Alerta
        return res.status(403).json({msg: error.message})
    }

    // Control del flujo - Manejo de errores
    try {
        const tareaAlmacenada = await Tarea.create(req.body) // crear tarea
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const obtenerTarea = async (req, res) =>{
    const { id } = req.params

    // Buscar la tarea y su creador 
    const tarea = await Tarea.findById(id).populate("proyecto")
    
    // Si no hay tareas
    if (!tarea) {
        const error = new Error("Tarea No encontrada") // Alerta
        return res.status(404).json({msg: error.message})
    }

    // Si el creador del proyecto es diferente al del usuario 
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción No Válida") // Alerta
        return res.status(403).json({msg: error.message})
    }

    res.json(tarea)
}

const actualizarTarea = async (req, res) =>{
    const { id } = req.params

    // Buscar la tarea y su creador 
    const tarea = await Tarea.findById(id).populate("proyecto")
    
    // Si no hay tareas
    if (!tarea) {
        const error = new Error("Tarea No encontrada") // Alerta
        return res.status(404).json({msg: error.message})
    }

    // Si el creador del proyecto es diferente al del usuario 
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción No Válida") // Alerta
        return res.status(403).json({msg: error.message})
    }

    // Actualizar los campos
    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.prioridad = req.body.prioridad || tarea.prioridad
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

    // Control del flujo - Manejo de errores
    try {
        const tareaAlmacenada = await tarea.save()
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const eliminarTarea = async (req, res) =>{}

const cambiarEstado = async (req, res) =>{}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
}