import { Link } from "react-router-dom";

const PreviewProyecto = ({ proyecto }) => {
  // Extraer la información
  const { nombre, _id, cliente } = proyecto;
  return (
    <div className="p-6 bg-white rounded-xl overflow-hidden hover:shadow-xl">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {nombre}
        </h5>
      <p className="mb-3 font-normal text-gray-700">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <div className="mt-3 mb-5">
        <span className="text-gray-600">Fecha de Creación:</span>
        <p className="text-sky-600">12 de Septiembre, 2023</p>
        
      </div>
      <Link
        to={`${_id}`}
        className="inline-flex items-center px-3 py-2 text-base font-medium text-center text-white bg-sky-600 rounded-lg hover:bg-sky-700 "
      >
        Leer más
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
};

export default PreviewProyecto;
