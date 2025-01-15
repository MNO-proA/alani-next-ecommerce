import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { motion } from "framer-motion";

const CartButton = ({setIsCartOpen, cartProducts}) => {
  return (
    <button
    className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group relative"
    onClick={() => setIsCartOpen(true)}
    disabled={cartProducts?.length === 0}
  >
    <span className="group-hover:block hidden transition-all duration-200">
      Cart
    </span>
    <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
    {cartProducts.length > 0 && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
      >
        {cartProducts.length}
      </motion.div>
    )}
  </button>
  )
}

export default CartButton