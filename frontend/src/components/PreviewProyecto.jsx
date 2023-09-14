import { Link } from "react-router-dom"

const PreviewProyecto = ({ proyecto }) => {
    // Extraer la información
    const { nombre, _id, cliente } = proyecto
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">{nombre}</h2>
                <p className="text-gray-600 mt-2">Descripción breve del proyecto.</p>
                <div className="mt-3">
                    <span className="text-gray-600">Cliente:</span>
                    <p className="text-sky-600">{cliente}</p>
                </div>
                <div className="mt-3 mb-5">
                    <span className="text-gray-600">Fecha de Creación:</span>
                    <p className="text-sky-600">12 de Septiembre, 2023</p>
                </div>
                <Link 
                to={`${_id}`}
                className="cursor-pointer  bg-sky-600 text-white py-2 px-4 rounded-full hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-400">
                    Ver proyecto
                </Link>
            </div>
        </div>
    )
}

export default PreviewProyecto
