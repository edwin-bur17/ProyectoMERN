import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center">UpTask</h2>
            <input type="search" className="rounded-xl lg:w-96 block p-2 border" placeholder="Buscar Proyectos" />
            <div className="flex items-center gap-4">
                <Link to='/proyectos' className="font-bold text-lg">
                    Proyectos
                </Link>
                <button type="button" className="text-white text-lg bg-sky-600 p-3 rounded-full font-bold">
                    Cerrar sesión
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header
