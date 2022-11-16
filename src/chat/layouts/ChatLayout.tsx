
import { FC } from "react"
import { Navbar, UsersList } from "../components";

interface Props {
  children: React.ReactNode; 
}


export const ChatLayout: FC<Props> = ({ children }) => {

  return (
    <div>

        <Navbar />


        <UsersList />

        <main>
          <div className="chatPageContainer">

            { children }

          </div>
        </main>


    </div>
  )

}
