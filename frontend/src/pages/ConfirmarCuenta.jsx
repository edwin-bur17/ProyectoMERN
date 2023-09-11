import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {
  // Mensaje de alerta
  const [alerta, setAlerta] = useState({})

  // Cuenta confirmada
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  // Extraer el token 
  const { id } = params

  //Confirmar cuenta
  useEffect(() => {
    const confirmarCuenta = async () => {
      // Control del flujo - manejo de exepciones
      try {
        const url = `http://localhost:4000/api/usuarios/confirmar/${id}`
        const { data } = await axios(url)
        setAlerta({
          msg:data.msg,
          error: false
        })
        setCuentaConfirmada(true)
        
      } catch (error) {
        // Acceder al mensaje
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  }, [])
  // Mensaje de alerta
  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center capitalize">Confirma tu cuenta y comienza a crear  tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
          className='block text-center my-5 text-slate-500 text-lg'
          to='/'>
          ¿Ya confirmaste tu cuenta? {' '}
          <span className="text-sky-700 font-semibold hover:border-b-4 border-sky-700">
            Inicia sesión aquí
          </span>
        </Link>
        )  
        }
      </div>
    </>
  )
}

export default ConfirmarCuenta
