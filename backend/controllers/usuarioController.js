import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generar.JWT.js";

const registrar = async (req, res) => {
  // Evitar registro duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email }); // Trae el usuario que coincida con el nuevo correo
  if (existeUsuario) {
    // si el usuario ya existe hacer:
    const error = new Error("Usuario ya existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Insertar nuevo usuario, es decir el objeto que viene del formulario, en este caso de postman
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save(); // Guardar el nuevo registro (usuario)
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};
// Autenticación del usuario
const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  // Alerta si usuario no existe
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Cmprobar su password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

// Confirmar cuenta del usuario via token
const confirmar = async (req, res) => {
  const { token } = req.params; // token enviado por url
  const usuarioConfirmar = await Usuario.findOne({ token });

  // Si el token ya se utilizó
  if (!usuarioConfirmar) {
    const error = new Error("Token NO válido");
    return res.status(403).json({ msg: error.message });
  }

  // si existe el token
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = ""; // eliminar token porque es de un solo uso
    await usuarioConfirmar.save(); // Guardar usuario en la DB
    res.json({ msg: "Usuario confirmado correctamente" }); // mensaje success
    console.log(usuarioConfirmar);
  } catch (error) {
    console.log(error);
  }
};

// Enviar nueco token para recuperar contraseña
const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

// Comprobar nuevo token para recuperar el password
const comprobarToken = async (req, res) => {
  const { token } = req.params; // extraer el token de la url

  const tokenValido = await Usuario.findOne({ token }); // Buscar en la DB un usuario con ese token

  if (tokenValido) {
    res.json({ msg: "Token válido y el usuario existe" });
  } else {
    const error = new Error("El token no es válido");
    return res.status(404).json({ msg: error.message });
  }
};

// Nueva contraseña
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token }); // Buscar en la DB un usuario con ese token

  if (usuario) {
    usuario.password = password; // Almacenar el nuevo password
    usuario.token = ""; // despues de usado el token eliminarlo
    try {
      await usuario.save(); // Guardar nuevo password
      res.json({ msg: "La contraseña ha sido modificada correctamente" });
    } catch (error) {
      console.log(error)
    }
  } else {
    const error = new Error("El token no es válido");
    return res.status(404).json({ msg: error.message });
  }
};

// Perfil usuario
const perfil = async (req,res) => {
  const { usuario } = req
  res.json(usuario)
}

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil
};
