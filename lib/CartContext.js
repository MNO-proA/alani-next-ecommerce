// import {createContext, useEffect, useState} from "react";

// export const CartContext = createContext({});

// export function CartContextProvider({children}) {
//   const ls = typeof window !== "undefined" ? window.localStorage : null;
//   const [cartProducts,setCartProducts] = useState([]);
//   useEffect(() => {
//     if (cartProducts?.length > 0) {
//       ls?.setItem('cart', JSON.stringify(cartProducts));
//     }
//   }, [cartProducts]);
//   useEffect(() => {
//     if (ls && ls.getItem('cart')) {
//       setCartProducts(JSON.parse(ls.getItem('cart')));
//     }
//   }, []);
//   function addProduct(productId) {
//     setCartProducts(prev => [...prev,productId]);
//   }
//   function removeProduct(productId) {
//     setCartProducts(prev => {
//       const pos = prev.indexOf(productId);
//       if (pos !== -1) {
//         return prev.filter((value,index) => index !== pos);
//       }
//       return prev;
//     });
//   }
//   function clearCart() {
//     setCartProducts([]);
//     ls?.removeItem('cart');
//   }
//   return (
//     <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
//       {children}
//     </CartContext.Provider>
//   );
// }
"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  // Add or increment product quantity
  function addToCart(product) {
    setCartProducts(prev => {
      const existingProduct = prev.find(item => item._id === product._id);
      if (existingProduct) {
        // If product exists, increment quantity
        return prev.map(item =>
          item._id === product._id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      // If product doesn't exist, add it with quantity 1
      return [...prev, {...product, quantity: 1}];
    });
  }

  // Increase quantity of a product
  function incrementQuantity(productId) {
    setCartProducts(prev =>
      prev.map(item =>
        item._id === productId
          ? {...item, quantity: item.quantity + 1}
          : item
      )
    );
  }

  // Decrease quantity of a product
  function decrementQuantity(productId) {
    setCartProducts(prev =>
      prev.map(item =>
        item._id === productId && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item
      ).filter(item => item.quantity > 0)
    );
  }

  // Remove a product from cart
  function removeFromCart(productId) {
    setCartProducts(prev => prev.filter(item => item._id !== productId));
  }

  // Clear entire cart
  function clearCart() {
    setCartProducts([]);
    ls?.removeItem('cart');
  }

  // Calculate total quantity
  const getTotalQuantity = () => {
    return cartProducts.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total amount
  const getTotalAmount = () => {
    return cartProducts.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartProducts,
      addToCart,
      incrementQuantity,
      decrementQuantity,
      removeFromCart,
      clearCart,
      getTotalQuantity,
      getTotalAmount,
    }}>
      {children}
    </CartContext.Provider>
  );
}