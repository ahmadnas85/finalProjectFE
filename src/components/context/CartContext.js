import React, { createContext,  useState } from "react";

const CartContext = createContext()

export function CartProvider ({children}) {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        console.log('Adding to cart:', item);
        setCart([...cart, item]);
        console.log('Updated cart:', cart);
    };

    const istemIsInCart = (item) => {
        return cart.some((cartItem) => cartItem.id === item.id);        
    }
    const removeFromCart = (item) => {
        const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
        setCart(updatedCart);
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, istemIsInCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;