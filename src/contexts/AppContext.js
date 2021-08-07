import { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from '../data/data';

export const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [app, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ app, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    return useContext(AppContext);
};


export default AppProvider;