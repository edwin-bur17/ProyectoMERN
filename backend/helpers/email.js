import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  // TODO: Mover hacia variables de entorno
  // Transport de mailtrap (para etapa de desarrollo)
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "ab1de6ff192feb",
      pass: "f9e31baad2aba7"
    }
  });

  // Información del email (cuerpo de email)
  const info = await transport.sendMail({
    from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Confirma tu cuenta",
    text: "Confirma tu cuenta en UpTask",
    html: `
        <p>Hola: ${nombre} confirma tu cuenta en UpTask</p>
        <p>Tu cuenta ya está casi lista solo debes confirmarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>
        </p>
        <p>Si no te has registrado en UpTask.com, puedes ignorar este mensaje</p>
        `,
  })
}

// Enviar confirmación para nueva contraseña
export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  // TODO: Mover hacia variables de entorno
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "ab1de6ff192feb",
      pass: "f9e31baad2aba7"
    }
  });

  // Información del email (cuerpo de email)
  const info = await transport.sendMail({
    from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Reestablece tu contraseña",
    text: "Reestablece la contraseña de tu cuenta en UpTask",
    html: `
        <p>Hola, <b>${nombre}</b> has solicitado reestablecer tu contraseña.</p>
        <p>Dar click en el siguiente enlace para generar una nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer contraseña</a>
        </p>
        <p>Si no solicitaste este correo, puedes ignorar este mensaje</p>
        `,
  })
}