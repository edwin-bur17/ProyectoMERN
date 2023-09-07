import express from "express"
import {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
} from "../controllers/tareaController.js"

import checkAuth from "../middleware/checkAuth.js"

// Definir el router
const router = express.Router()

    router.post('/', checkAuth, agregarTarea) // Crear Tarea

    router
    .route('/:id') // Route dinamico
    .get(checkAuth, obtenerTarea) // Listar Tarea
    .put(checkAuth, actualizarTarea) // Actualizar Tarea
    .delete(checkAuth, eliminarTarea) // Borrar Tarea

    router.post('/estado/:id', checkAuth, cambiarEstado) // Cambiar el estado de la tareas

export default router
 