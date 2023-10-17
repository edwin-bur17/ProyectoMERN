import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema(
  {
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
    fechaEntrega: {
      type: Date,
      default: Date.now(),
    },
    cliente: {
      type: String,
      trim: true,
      required: true,
    },
    creador: {
        // llave foranea a usuarios
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuario",
    },
    tareas:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tarea",
      }
    ],
    colaboradores: [
      // Arreglo de objetos
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
      },
    ],
  },
  {
    // Para crear, actualizar las columnas de fecha creado y actualizado en la BD
    timestamps:true, 
  }
);

const Proyecto = mongoose.model('Proyecto', proyectosSchema)
export default Proyecto
