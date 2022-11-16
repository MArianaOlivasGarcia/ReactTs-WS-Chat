import { FC } from "react"

interface Props {
  message: any
}


export const FriendMessage: FC<Props> = ({ message }) => {
  return (
    <div className="friendMessage">
        <span>{message.text}</span>
    </div>
  )
}
