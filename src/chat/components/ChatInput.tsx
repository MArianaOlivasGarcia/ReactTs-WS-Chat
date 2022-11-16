import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { SocketContext } from "../../sockets/context/SocketContext";
import { ChatContext } from "../context/ChatContext";



export const ChatInput = () => {

    const { socket } = useContext( SocketContext );
    const { auth } = useContext( AuthContext );
    const { chatState } = useContext( ChatContext );

    const [message, setMessage] = useState('');

    const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setMessage( target.value )
    }

    const handleOnSubmit = ( event: FormEvent ) => {
        event.preventDefault();

        if ( message.length === 0 ) { return; }

        socket.emit('personal-message', {
          from: auth.user._id,
          to: chatState.activeChat._id,
          text: message
        })

        console.log({
          from: auth.user._id,
          to: chatState.activeChat._id,
          text: message
        })

        setMessage('');
    }


  return (
    <form className="chatInput d-flex align-items-center px-3 mt-2"
          noValidate 
          onSubmit={ handleOnSubmit }>
      <input 
        type="text" 
        className="form-control"
        placeholder="Escribe tu mensaje aquí..."
        value={ message }
        onChange={ handleOnChange } />
      <button 
        disabled={ message.length === 0 }
        className="btn btn-primary" type="submit">Enviar</button>
    </form>
  )
}
