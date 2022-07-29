import { createContext, useContext, useReducer } from 'react'
import { InitialToast, ToastReducer } from '../Utils'

const Toast = createContext()

export const ToastProvider = ({ children }) => {
  const [toast, toastDispatch] = useReducer(ToastReducer, InitialToast)
  return (
    <Toast.Provider value={{ toast, toastDispatch }}>{children}</Toast.Provider>
  )
}

export const useToast = () => {
  return useContext(Toast)
}
