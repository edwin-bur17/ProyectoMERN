import { formatearFecha } from "../helpers/formatearFecha";
import { Link } from "react-router-dom";

const PreviewProyecto = ({ proyecto }) => {
  // Extraer la información
  const { nombre, _id, cliente, descripcion, fechaEntrega } = proyecto;

  return (
    <Link
      to={`${_id}`}
      className="p-6 bg-white rounded-xl overflow-hidden transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
        {nombre}
      </h5>
      <p className="mb-3 font-normal text-gray-700 line-clamp-2">
        {descripcion}
      </p>
      <div className="mt-3 mb-5">
        <span className="text-gray-600">Fecha de Entrega:</span>
        <p className="text-sky-600">{formatearFecha(fechaEntrega)}</p>
      </div>
    </Link>
  );
};

export default PreviewProyecto;
