import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <aside className="md:w-80 lg:w-90 px-5 py-10">
      <p className="text-xl font-bold mb-5 text-center xl:text-left">Hola, {auth.nombre}</p>

      {/* boton nuevo proyecto */}
      <Link
        to="crear-proyecto"
        className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 transition-all 300 hover:bg-sky-600 hover:ring-sky-600"
      >
        <div className="flex items-center space-x-3">
          <svg
            className="h-8 w-8 stroke-sky-600 group-hover:stroke-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>

          <h3 className="text-slate-900 group-hover:text-white text-xl font-semibold">
            Nuevo Proyecto
          </h3>
        </div>
        <p className="text-slate-500 group-hover:text-white text-sm">
          Cree un nuevo proyecto y administrelo, agregando colaboradores, tareas ...
        </p>
      </Link>
    </aside>
  );
};

export default Sidebar;
