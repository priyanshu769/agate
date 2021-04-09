import { createContext, useContext, useReducer } from 'react';
import { products, cart, wishList, wholeInventory, fastDeliveryOnly, sortType, reducer } from '../data/data';

export const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [app, dispatch] = useReducer(reducer, { products, cart, wishList, wholeInventory, fastDeliveryOnly, sortType });
    return (
        <AppContext.Provider value= {{app, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    return useContext(AppContext);
};


export default AppProvider;