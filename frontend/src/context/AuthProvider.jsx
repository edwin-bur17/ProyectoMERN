import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({}); // Usuario logueado

  // Token del usuario
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      // Configuracion 
      const config = {
        headers: {
          "Content-Type": "aplication/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Control del flujo manejo de exepciones
      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data)
      } catch (error) {}
    };
    autenticarUsuario();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
