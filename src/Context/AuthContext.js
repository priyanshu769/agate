import { createContext, useContext, useReducer } from 'react'
import { InitialAuth, AuthReducer } from '../Utils'

const Auth = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(AuthReducer, InitialAuth)
  return (
    <Auth.Provider value={{ auth, authDispatch }}>{children}</Auth.Provider>
  )
}

export const useAuth = () => {
  return useContext(Auth)
}
