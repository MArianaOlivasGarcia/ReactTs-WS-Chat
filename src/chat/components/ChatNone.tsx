
import logo from '/src/assets/chat-logo.png';


export const ChatNone = () => {
  return (
    <div className="p-5 chatNone">

      <img src={logo} alt="" width={200} />

      <p className="text-center">Empieza a enviar y recibir mensajes desde ahora.</p>
    </div>
  )
}
