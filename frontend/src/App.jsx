import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Proyectos from "./pages/Proyectos";

import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";


import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layouts/RutaProtegida";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas del layout publico */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} /> {/*  ruta pagina login */}
            <Route path="registrar" element={<Registrar />} />{" "}
            {/*  ruta pagina registar nuevo usuario */}
            <Route path="olvide-password" element={<OlvidePassword />} />{" "}
            {/*  ruta pagina ovide la contraseña */}
            <Route
              path="olvide-password/:token"
              element={<NuevoPassword />}
            />{" "}
            {/*  ruta pagina crear nueva contraseña*/}
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />{" "}
            {/*  ruta pagina confirmar cuenta*/}

            {/* Rutas privadas */}
          </Route>
          <Route path="/proyectos" element={<RutaProtegida />}>
            <Route index element={<Proyectos />}/>
          </Route>
        </Routes>
        
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
