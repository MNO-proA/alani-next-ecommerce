
"use client";

import React from "react";
import { ShoppingCart, CheckCircle } from "lucide-react"; // Update with your icon library if needed
import { ToastContainer, toast } from "react-toastify";
import { addToCart } from "@/lib/clientAddToCart";

export const AddToCartButton = ({
  product,
  className = "",
  iconSize = 20,
  buttonText = "Add to Cart",
  onClick = () => {},
}) => {
  const handleAddToCart = () => {
    if (product?.outOfStock) {
      return; // Prevent adding out-of-stock products
    }

    addToCart(product);
    onClick(); // Call any additional functionality, if provided

    // Show a success toast notification
    toast.success(
      <div className="flex items-center gap-3">
        <CheckCircle className="text-green-500" size={24} />
        <span>
          <strong>{product?.title}</strong> has been added to your cart!
        </span>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "bg-white text-black shadow-md rounded-lg",
        bodyClassName: "text-sm font-medium",
      }
    );
  };

  return (
    <>
      <button
        className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full duration-300 
      ${
        product?.outOfStock
          ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
          : "bg-primary text-white hover:opacity-90"
      } ${className}`}
        onClick={handleAddToCart}
        disabled={product?.outOfStock}
      >
        <ShoppingCart size={iconSize} />
        {product?.outOfStock ? "Out of Stock" : buttonText}
      </button>
      <ToastContainer />
    </>
  );
};
