import mongoose from "mongoose";

// Declaracion del schema (modelo, tabla)
const tareaSchema = mongoose.Schema({
    // Campos
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true,
    },
    estado: {
        type: Boolean,
        default: false,
    },
    FechaEntrega: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    prioridad: {
        type: String,
        required: true,
        enum: ['Baja', 'Media', 'Alta'], // Arreglo de opciones
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId, // clave foranea (id del proyecto)
        ref: 'Proyecto',
    },
},{
    timestamps: true,
})

// Definir el modelo
const Tarea = mongoose.model("Tarea", tareaSchema)
export default Tarea