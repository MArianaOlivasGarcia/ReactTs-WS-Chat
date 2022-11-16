import { Navigate, Route, Routes } from 'react-router-dom'
import { ChatLayout } from "../layouts"
import { ChatPage } from "../pages"


export const ChatRoutes = () => {
  return (
    <ChatLayout>
        <Routes>
            <Route path="chat" element={ <ChatPage /> }/>

            <Route path="/*" element={ <Navigate to="/chat" /> }/>
        </Routes>
    </ChatLayout>
  )
}
