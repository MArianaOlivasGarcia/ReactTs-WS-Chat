
import { useContext } from 'react';
import { AuthContext, User } from '../../auth/context/AuthContext';
import { types } from '../../types/types';
import { ChatContext } from '../context/ChatContext';
import { UserCard } from './UserCard';
import logo from '/src/assets/chat-logo.png';


export const UsersList = () => {

  const { auth ,logout } = useContext( AuthContext )

  const { chatState, dispatch } = useContext( ChatContext )


  const handleLogout = () => {
    
    dispatch({
      type: types.clearChatState
    })

    logout();
  }

  return (
      <div className="offcanvas offcanvas-start sidebarNav bg-white" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
       
       <div className="offcanvas-header">
            <img className="image-logo" width={50} src={logo} />
            <div className='text-center'>
              <h5 className="offcanvas-title text-secondary" id="offcanvasExampleLabel">Marianito's Chat</h5>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='me-2'><small>{ auth.user.fullName }</small></span>
                <div className='isOnlineIcon'></div>
              </div>
            </div>
            <button onClick={handleLogout} className='btn btn-outline-primary'><i className="fa-solid fa-right-from-bracket"></i></button>
        </div>

        <div className="offcanvas-body p-2">
        
            <ul className="navbar-nav sidebarList">

              {
                chatState.users.map( (user: User) => (
                  <UserCard key={ user._id } user={ user } />
                ))
              }


            </ul>
    
        </div>

    </div>
  )
}
