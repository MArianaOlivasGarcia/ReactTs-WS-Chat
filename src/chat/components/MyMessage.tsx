import { FC } from "react"

interface Props {
    message: any
}


export const MyMessage: FC<Props> = ({ message }) => {
  return (
    <div className="myMessage">
        <span>{message.text}</span>
    </div>
  )
}
