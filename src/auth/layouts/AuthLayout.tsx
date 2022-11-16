


import { FC } from "react"
import logo from '/src/assets/chat-logo.png';

interface Props {
    children: React.ReactNode; 
}

export const AuthLayout: FC<Props> =  ({ children }) => {

  return (
    <div 
      className="vw-100 vh-100 d-flex justify-content-center flex-column align-items-center"
      style={{ background: 'linear-gradient(162deg, rgba(26,108,255,1) 0%, rgba(178,43,255,1) 100%)' }}>


        <div style={{ width: '80%', height: '70%' }} className='row m-auto bg-white shadow border'>

            <div className="col-md-6 p-0 d-flex flex-column" style={{ backgroundColor: '#FAF8FD' }}>

                <div className="d-flex flex-column justify-content-center align-items-center" style={{flex: '1'}}>
                    <h3>Bienvenido a <span>Marianito's Chat</span></h3>
                    <img src={logo} alt="LOGO CHAT" style={{ width: '50%' }}/>
                    <h5 className="text-center">Ponte en contacto con tus amigos <br /> a cualquier hora en cualquier lugar</h5>
                </div>

                <p className="text-center text-muted">&#169; Mariana Olivas</p>     

            </div>

            <div className="col-md-6 d-flex flex-column justify-content-center">
              { children }
            </div>

        </div>
      

    </div>
  )
}
