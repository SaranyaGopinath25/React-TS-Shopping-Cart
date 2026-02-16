import { createContext, useContext } from "react";


const ShoppingCartContext = createContext({});

export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}

type ShoppingCartProviderProps = {
    children : React.ReactNode
}

export function ShoppingCartProvider({ children } : ShoppingCartProviderProps){
    return(
        <ShoppingCartContext.Provider value={{}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}