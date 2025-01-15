// "use client"


// import { FaCartShopping} from "react-icons/fa6"
// import { motion, AnimatePresence } from "framer-motion";
// import { IoMdAdd, IoMdRemove } from "react-icons/io";
// import { FaTrash } from "react-icons/fa";
// import { CartContext } from '@/lib/CartContext';
// import { useContext } from 'react';
// import { useRouter } from "next/navigation";

// const CartModal = ({ isOpen, onClose }) => {
//   const router = useRouter();
    
//   const { 
//     cartProducts, 
//     incrementQuantity, 
//     decrementQuantity, 
//     removeFromCart,
//     getTotalAmount 
//   } = useContext(CartContext)

//   const total = getTotalAmount();

//     const handleCheckoutNavigation = () => {
//         router.push("/store/checkout");
//         onClose()
//     };

//     console.log(cartProducts)
  
//     return (
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.5 }}
//               exit={{ opacity: 0 }}
//               onClick={onClose}
//               className="fixed inset-0 bg-black z-50"
//             />
            
//             {/* Cart Modal */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween", duration: 0.3 }}
//               className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-lg z-50 overflow-hidden flex flex-col"
//             >
//               <div className="p-4 border-b dark:border-gray-700">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-semibold dark:text-white">Your Cart</h2>
//                   <button
//                     onClick={onClose}
//                     className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               </div>
  
//               <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {cartProducts.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
//                     <FaCartShopping size={48} className="mb-4 opacity-50" />
//                     <p>Your cart is empty</p>
//                   </div>
//                 ) : (
//                   cartProducts.map((item) => (
//                     <motion.div
//                       key={item?._id}
//                       layout
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       className="flex gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
//                     >
//                       <img
//                         src={item?.images[0]}
//                         alt={item?.title}
//                         className="w-20 h-20 object-cover rounded-md"
//                       />
//                       <div className="flex-1">
//                         <h3 className="font-medium dark:text-white">{item?.title}</h3>
//                         <p className="text-primary font-semibold">${item?.price}</p>
//                         <div className="flex items-center gap-2 mt-2">
//                           <button
//                             onClick={() => decrementQuantity(item._id)}
//                             className="p-1 rounded-full hover:text-primary dark:hover:bg-gray-700"
//                           >
//                             <IoMdRemove />
//                           </button>
//                           <span className="w-8 text-center dark:text-white">{item.quantity}</span>
//                           <button
//                            onClick={() => incrementQuantity(item._id)}
//                             className="p-1 rounded-full hover:text-primary dark:hover:bg-gray-700"
//                           >
//                             <IoMdAdd />
//                           </button>
//                           <button
//                             onClick={() => removeFromCart(item._id)}
//                             className="ml-auto p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
//                           >
//                             <FaTrash size={14} />
//                           </button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))
//                 )}
//               </div>
  
//               <div className="p-4 border-t dark:border-gray-700">
//                 <div className="flex justify-between mb-4">
//                   <span className="font-semibold dark:text-white">Total:</span>
//                   <span className="font-bold text-primary">${total.toFixed(2)}</span>
//                 </div>
//                 <button
//                   className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
//                   disabled={cartProducts?.length === 0}
//                   onClick={handleCheckoutNavigation}
//                 >
//                   Proceed to Checkout
//                 </button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     );
//   };
  
// export default CartModal

"use client";

import { FaCartShopping } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "@/lib/CartContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const CartModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  const {
    cartProducts,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    getTotalAmount,
  } = useContext(CartContext);

  const total = getTotalAmount();

  const handleCheckoutNavigation = () => {
    router.push("/store/checkout");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Cart Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-lg z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-3 sm:p-4 border-b dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-semibold dark:text-white">
                  Your Cart
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
              {cartProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <FaCartShopping size={48} className="mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cartProducts.map((item) => (
                  <motion.div
                    key={item?._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4 bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg"
                  >
                    <img
                      src={item?.images[0]}
                      alt={item?.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium dark:text-white text-sm sm:text-base">
                        {item?.title}
                      </h3>
                      <p className="text-primary font-semibold text-sm sm:text-base">
                        ${item?.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decrementQuantity(item._id)}
                          className="p-1 rounded-full hover:text-primary dark:hover:bg-gray-700"
                        >
                          <IoMdRemove />
                        </button>
                        <span className="w-6 sm:w-8 text-center dark:text-white text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(item._id)}
                          className="p-1 rounded-full hover:text-primary dark:hover:bg-gray-700"
                        >
                          <IoMdAdd />
                        </button>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="ml-auto p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4 border-t dark:border-gray-700">
              <div className="flex justify-between mb-4 text-sm sm:text-base">
                <span className="font-semibold dark:text-white">Total:</span>
                <span className="font-bold text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 sm:py-3 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={cartProducts?.length === 0}
                onClick={handleCheckoutNavigation}
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
