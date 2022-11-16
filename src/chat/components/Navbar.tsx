import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"



export const Navbar = () => {

  const { chatState } = useContext( ChatContext )


  return (
    <nav className="navbar navbar-expand navbar-light bg-white fixed-top border">
        <div className="container-fluid">

        <a className="d-lg-none me-3" data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample">
            <i className="fa-solid fa-bars"></i>
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            {
                chatState.activeChat
                && <li className="nav-item">
                        <img 
                            style={{ borderRadius: '100%', border: '2px solid #fcfeff'}}
                            className={ chatState.activeChat.isOnline ? 'userOnline' : 'shadow-sm' }
                            width="40"
                            height="40"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" 
                            alt="User image" />
                        <span className="ms-2">{ chatState.activeChat.fullName }</span>
                    </li>
            }

                

            
            </ul>
            
        </div>



        </div>
    </nav>
  )
}
