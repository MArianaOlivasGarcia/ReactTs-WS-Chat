import { useContext } from "react"
import { ChatNone, ChatSelected } from "../components"
import { ChatContext } from "../context/ChatContext"


export const ChatPage = () => {

  const { chatState } = useContext( ChatContext )


  return (
    <>
      {
        chatState.activeChat 
          ? <ChatSelected />
          : <ChatNone />
      }
    </>
  )
}
