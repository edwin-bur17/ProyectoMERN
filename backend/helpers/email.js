import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

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
