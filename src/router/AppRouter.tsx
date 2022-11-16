import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthContext, IAuthContext } from "../auth/context/AuthContext";
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ChatRoutes } from "../chat/routes/ChatRoutes";
import logo from '/src/assets/chat-logo.png';


export const AppRouter = () => {

  const { auth, verifyToken } = useContext<IAuthContext>( AuthContext );

  useEffect(() => {
    verifyToken();
  }, [ verifyToken ])

  if ( auth.status == 'isCheking' ) {
    return (
      <div className="vw-100 vh-100 d-flex justify-content-center align-items-center flex-column">
        <img className="image-logo" width={50} src={logo} />
        <p><span>Cargando...</span></p>
      </div>
    )
  }
  

  return (
    <Routes>
      {
          ( auth.status == 'isAuthenticated' ) 
            ? <Route path="/*" element={ <ChatRoutes /> } />
            : <Route path="/auth/*" element={ <AuthRoutes /> } />
      }
      <Route path="/*" element={ <Navigate to='/auth/login' replace />} />
    </Routes>
  )
}
