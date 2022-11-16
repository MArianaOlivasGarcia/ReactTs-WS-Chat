import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { ChatInput } from "./ChatInput"
import { FriendMessage } from "./FriendMessage"
import { MyMessage } from "./MyMessage"



export const ChatSelected = () => {

  const { chatState, dispatch } = useContext( ChatContext );

  return (
    <div style={{ height: '100%' }}>
      <div className="chatSelected">


        {
          (chatState.messages as []).map( (message: any, index: number) => (
            ( message.from != chatState.activeChat._id )
              ? <MyMessage key={index} message={message} />
              : <FriendMessage key={index} message={message} />
          ))
        }
        
        {/* 

       {
          [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map( chat => (
            <FriendMessage key={chat} chat={chat} />
          ))
        } */}


      </div>
      <ChatInput />
    </div>
  )
}
