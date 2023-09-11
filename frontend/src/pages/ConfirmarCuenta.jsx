import {useState, useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import axios from "axios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {
  const params = useParams()
  // Extraer el token 
  const {id} = params

  //Confirmar cuenta
  useEffect(() => {
    const confirmarCuenta = async () => {
      // Control del flujo - manejo de exepciones
      try {
        const url = `http://localhost:4000/api/usuarios/confirmar/${id}`
        const { data } = await axios(url)

        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    confirmarCuenta()
  }, [])
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center capitalize">Confirma tu cuenta y comienza a crear  tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

    </>
  )
}

export default ConfirmarCuenta
