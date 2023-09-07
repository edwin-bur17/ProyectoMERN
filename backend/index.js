// const express = require("express"); // sintaxis del comand js
import  express  from "express"; // sintaxis del import
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"

const app = express();
// Para poder leer archivos json
app.use(express.json())

dotenv.config();
conectarDB();

// Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

// Variable del puerto
const PORT = process.env.PORT || 4000;

// Configuracion del servidor
app.listen(4000, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
});