import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  // Transport de mailtrap (para etapa de desarrollo)
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
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

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
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