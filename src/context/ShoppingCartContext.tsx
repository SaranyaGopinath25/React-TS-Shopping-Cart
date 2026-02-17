import { createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

type ShoppingCartContext = {
    openCart : () => void;
    closeCart : () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity : number;
  cartItems : CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce(
    ((accumulator, currentItem) => accumulator + currentItem.quantity), 0);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems((prevItems) => {
      if (prevItems.find((prevItem) => prevItem.id === id) == null) {
        return [...prevItems, { id, quantity: 1 }];
      } else {
        return prevItems.map((prevItem) => {
          if (prevItem.id === id) {
            return { ...prevItem, quantity: prevItem.quantity + 1 };
          } else {
            return prevItem;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((prevItems) => {
      if (prevItems.find((prevItem) => prevItem.id === id)?.quantity == 1) {
        return prevItems.filter((prevItem) => prevItem.id !== id);
      } else {
        return prevItems.map((prevItem) => {
          if (prevItem.id === id) {
            return { ...prevItem, quantity: prevItem.quantity - 1 };
          } else {
            return prevItem;
          }
        });
      }
    });
  }

    function removeFromCart(id: number) {
    setCartItems((prevItems) => {
      return prevItems.filter((prevItem) => prevItem.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider 
    value={{ 
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart ,
        cartItems,
        cartQuantity,
        openCart,
        closeCart
        }}>
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  );
}
