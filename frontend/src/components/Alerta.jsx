
const Alerta = ({alerta}) => {
  return (
    // Alerta success o danger
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-4 rounded-xl text-white font-semibold text-lg my-10 `}>
      {alerta.msg}
    </div>
  )
}

export default Alerta
