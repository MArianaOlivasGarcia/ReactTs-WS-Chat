


import { FC, useCallback, useState } from 'react';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';
import { AuthContext, initialState } from './AuthContext'

interface Props {
    children: React.ReactNode; 
}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [ auth, setAuth ] = useState(initialState)

    const login = async ( email: string, password: string ) => {

        const resp = await axiosWithoutToken('/auth/login', { email, password }, 'POST');

        if ( resp.status ) {

            localStorage.setItem('accessToken', resp.accessToken)

            setAuth({
                user: resp.user,
                status: 'isAuthenticated',
            })

        } 

        return resp.status;

    }

    const register = async ( fullName: string, email: string, password: string ) => {

        const resp = await axiosWithoutToken('/auth/register', { email, password, fullName }, 'POST');

        if ( resp.status ) {

            localStorage.setItem('accessToken', resp.accessToken)
            console.log('register', resp.accessToken);

            setAuth({
                user: resp.user,
                status: 'isAuthenticated',
            })

        } 

        return resp;

    }

    // Dentro de un useEffect por eso usamos useCallback para no hacer multiples peticiones
    const verifyToken = useCallback( async () => {

        const accessToken = localStorage.getItem('accessToken');

        if ( !accessToken ){
            return setAuth({
                status: 'isNotAuthenticated',
            })
        }

        const resp = await axiosWithToken('/auth/renew');

        if ( resp.status ) {
            localStorage.setItem('accessToken', resp.accessToken)

            setAuth({
                user: resp.user,
                status: 'isAuthenticated',
            })

        } else {
            setAuth({
                status: 'isNotAuthenticated',
            })
        }

        return resp.status;


    }, [])


    const logout = () => {
        localStorage.removeItem('accessToken');

        setAuth({
            status: 'isNotAuthenticated',
        })
    }

    return (
        <AuthContext.Provider value={{

            auth,

            // Métodos
            login,
            register,
            verifyToken,
            logout,

        }}>
            { children }
        </AuthContext.Provider>
    )


}
