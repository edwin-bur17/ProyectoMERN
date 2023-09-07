import express from "express";
const router = express.Router();

import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

// Autentificación, Registro y confirmación de usuarios
router.post('/', registrar); // creación de usuarios
router.post('/login', autenticar); // Login
router.get('/confirmar/:token', confirmar); // Confirmar cuenta via token
router.post('/olvide-password', olvidePassword); // Eviar nuevo token para recuperar contraseña
// router.get('/olvide-password/:token', comprobarToken) // comprobar token
// router.post('/olvide-password/:token', nuevoPassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword) // comprobar token y nuevo password

router.get('/perfil', checkAuth, perfil)

export default router;
