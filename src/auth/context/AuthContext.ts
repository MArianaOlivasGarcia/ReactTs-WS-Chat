import { createContext } from "react";

export interface AuthState {
    user?: User,
    status: 'isAuthenticated' | 'isNotAuthenticated' | 'isCheking' 
}

export interface User {
    _id: string,
    fullName: string,
    email: string,
    image?: string,
    isOnline: boolean
}

export interface IAuthContext {
    auth: AuthState,

    // Métodos
    login: () => void,
    register: () => void,
    verifyToken: () => void,
    logout: () => void,
}

export const AuthContext = createContext<any>(null);



export const initialState: AuthState = {
    status: 'isCheking'
}


