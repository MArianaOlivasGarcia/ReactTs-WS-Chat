import { FC, useContext, useEffect } from "react";
import { AuthContext, IAuthContext } from "../../auth/context/AuthContext";
import { ChatContext } from "../../chat/context/ChatContext";
import { types } from "../../types/types";
import { useSocket } from "../hooks/useSocket";
import { SocketContext } from "./SocketContext";


interface Props {
    children: React.ReactNode; 
}

export const SocketProvider: FC<Props> = ({ children }) => {

    const { socket, isOnline, connectSocket ,disconnectSocket } = useSocket('http://localhost:3000/');

    const { auth }: IAuthContext = useContext( AuthContext );

    const { dispatch } = useContext( ChatContext );

    // Conectarme a mi servidor de sockets
    useEffect(() => {
        if ( auth.status == 'isAuthenticated' ) {
            connectSocket();
        }
    }, [ auth, connectSocket ])



    // Desconectarme a mi servidor de sockets
    useEffect(() => {
        if ( auth.status != 'isAuthenticated' ) {
            disconnectSocket();
        }
    }, [ auth, disconnectSocket ])


    // Escuchar listado de usuarios cuando uno se conecta
    useEffect(() => {
        socket?.on('list-users', ( users: any ) => {
            console.log(users)
            dispatch({
                type: types.setUsers,
                payload: users 
            })
        })
    }, [ socket, dispatch ])


    // Escuchar mensajes personales
    // useEffect(() => {
    //     socket?.on('personal-message', ( message: any ) => {

    //         dispatch({
    //             type: types.setNewMessage,
    //             payload: message
    //         })

    //         // Hacer scroll to bottom
    //         scrollToButtomAnimated('messages-scroll');
    //     })
    // }, [ socket, dispatch ])


    return (
        <SocketContext.Provider value={{
            socket,
            isOnline
        }}>
            { children }
        </SocketContext.Provider>
    )

}