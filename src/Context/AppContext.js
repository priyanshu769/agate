import { createContext, useContext, useReducer } from 'react'
import { InitialApp, AppReducer } from '../Utils'

export const App = createContext()

export const AppProvider = ({children}) => {
    const [app, appDispatch] = useReducer(AppReducer, InitialApp)
  return <App.Provider value={{app, appDispatch}}>{children}</App.Provider>
}

export const useApp = () => useContext(App)
