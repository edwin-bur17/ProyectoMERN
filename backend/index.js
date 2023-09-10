// const express = require("express"); // sintaxis del comand js
import  express  from "express"; // sintaxis del import
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"

const app = express();
// Para poder leer archivos json
app.use(express.json())

dotenv.config();
conectarDB();

// Configurar CORS
const whiteList = ["http://localhost:5173", "http://127.0.0.1:5173"] // Lista blanca: para recibir peticiones de este dominio

const corsOptions = {
    origin: function(origin, callback){
        if (whiteList.includes(origin)) {
            // Puede consultar la API
            callback(null, true)
        }else{
            // No esta permitido el req
            callback(new Error("Error de Cors"))
        }
    }
}
app.use(cors(corsOptions)) // Para poder usar la configuración de cors
   
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