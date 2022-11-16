import { FC, useContext } from "react"
import { User } from "../../auth/context/AuthContext"
import { axiosWithToken } from "../../helpers/axios";
import { types } from "../../types/types";
import { ChatContext } from "../context/ChatContext";

interface Props {
  user: User
}


export const UserCard: FC<Props>= ({ user }) => {

  const { dispatch } = useContext( ChatContext );


  const handleOnClick = async () => {

    // Asignar como chat activo (seleccionar chat)
    dispatch({
      type: types.setActiveChat,
      payload: user
    })

    // Obtener sus 30 ultimos mensajes
    const resp = await axiosWithToken(`/messages/${ user._id }`)

    if ( resp.status ) {
      dispatch({
        type: types.setLast30Messages,
        payload: resp.messages
      })
    }
    
    // Mover scroll al final
    // scrollToButtom('messages-scroll');

  }


  return (
    <div onClick={ handleOnClick } className="card border-0 p-2 mb-2" style={{ backgroundColor: '#e0e0e0', cursor: 'pointer' }}>
                
        <div className="row">
                  
            <div className="col-md-3 d-flex justify-content-center align-items-center">
                <img 
                    width={50}
                    height={50}
                    style={{ borderRadius: '100%', border: '2px solid #fcfeff' }}
                    className={ user.isOnline ? 'userOnline' : '' }
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" 
                    alt="" />
            </div>

            <div className="col-md-9">
                <p className="m-0">{ user.fullName }</p>
                <p className="m-0"><small>{ user.email }</small></p>
            </div>
                  
        </div>

    </div>
  )
}
