import { useContext } from 'react';
import { CartContext } from '@/lib/CartContext';

let addToCartFunction = null;

export const InitializeCartContext = () => {
  const { addToCart } = useContext(CartContext);
  addToCartFunction = addToCart;
  return null; // This component doesn't render anything
};

// Export the `addToCart` function
export const addToCart = (...args) => {
  if (!addToCartFunction) {
    throw new Error("CartContext is not initialized. Please include <InitializeCartContext /> in your app.");
  }
  return addToCartFunction(...args);
};
