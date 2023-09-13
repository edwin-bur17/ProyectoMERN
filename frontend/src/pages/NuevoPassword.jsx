import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {
  const [password, setPassword] = useState(""); // contraseña
  const [tokenValido, setTokenValido] = useState(false); // token valido
  const [alerta, setAlerta] = useState({}); // Alerta
  const [passwordModificado, setPasswordModificado] = useState(false); // Nueva contraseña
  const params = useParams(); // Leer el token de la url
  const { token } = params; // almacenar el token de la url

  // Comprobar token
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`); // hacer la peticion
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
        // Quitar la alerta
        setTimeout(() => {
          setAlerta({});
        }, 5000);
      }
    };
    comprobarToken();
  }, []);
  // Extraer mensaje de la alerta
  const { msg } = alerta;

  // Envio del formulario nueva contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del formulario
    if (password.length < 8) {
      setAlerta({
        msg: "La contraseña debe contener mínimo 8 caracteres.",
        error: true,
      });
      // Quitar la alerta
      setTimeout(() => {
        setAlerta({})
      }, 5000)
      return;
    }

    // Manejo de exepciones- control del flujo
    try {
      const url = `/usuarios/olvide-password/${token}`; // hacer la petición
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        // Alerta contraseña creada exitosamente
        msg: data.msg,
        error: false,
      });
      // Quitar la alerta
      setTimeout(() => {
        setAlerta({})
      }, 5000)
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        // Alerta token no valido
        msg: error.response.data.msg,
        error: true,
      });
      // Quitar la alerta
      setTimeout(() => {
        setAlerta({})
      }, 5000)
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center capitalize">
        Reestablece tu contraseña y no pierdas tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-xl p-10 "
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="text-gray-600 block text-xl font-bold"
            >
              Nueva Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
              placeholder="Digita tu nueva contraseña"
            />
          </div>
          <input
            className="w-full mb-5 mt-8 border-solid border-2 border-sky-700 text-sky-700 font-bold text-xl rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-sky-700 hover:text-white"
            type="submit"
            value="Guardar Nueva Contraseña"
          />
        </form>
      )}
      {passwordModificado && (
        <Link className="block text-center my-5 text-slate-500 text-lg" to="/">
          ¿Ya reestableciste tu contraseña?{" "}
          <span className="text-sky-700 font-semibold hover:border-b-4 border-sky-700">
            Inicia sesión aquí
          </span>
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
