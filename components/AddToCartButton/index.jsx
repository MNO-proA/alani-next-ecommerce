"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";// Update with your icon library if different
import { addToCart } from "@/lib/clientAddToCart";

export const AddToCartButton = ({ 
  product, 
  className = "", 
  iconSize = 20, 
  buttonText = "Add to Cart", 
  onClick = () => {} 
}) => {
  const handleAddToCart = () => {
    console.log(product)
    addToCart(product);
    onClick(); // Call any additional functionality, if provided
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-full hover:opacity-90 duration-300 ${className}`}
      onClick={handleAddToCart}
    >
      <ShoppingCart size={iconSize} />
      {buttonText}
    </button>
  );
};
