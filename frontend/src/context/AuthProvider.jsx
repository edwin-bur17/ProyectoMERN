import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({}); // Usuario logueado
  const [cargando, setCargando] = useState(true)

  const navigate = useNavigate() // Reedireccionar al usuario

  // Token del usuario
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false)
        return;
      }

      // Configuracion 
      const config = {
        headers: {
          "Content-Type": "aplication/json",
           Authorization: `Bearer ${token}`
        },
      };

      // Control del flujo manejo de exepciones
      try {
        const { data } = await clienteAxios("/usuarios/perfil", config); // Hacer la petición
        setAuth(data)
        navigate('/proyectos') //  Reedireccionar al usuario luego del login
      } catch (error) {
        setAuth({})
      }
      setCargando(false)
    };
    autenticarUsuario();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
