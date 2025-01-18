
"use client";

import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "@/lib/CartContext";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import styles from "./DeliveryAnimation.module.css";
import { usePathname } from "next/navigation";
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const formControlVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gps: "",
    city: "",
    paymentMethod: "paystack",
  });

  const {
    cartProducts,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    getTotalQuantity,
    getTotalAmount,
    clearCart,
  } = useContext(CartContext);

  const [formValid, setFormValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const pathname = usePathname();  
  


  useEffect(() => {
    const { email, phone, address, city } = formData;
    setFormValid(Boolean(email && phone && address && city));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const cart_items = cartProducts.map((product) => ({
    _id: product._id,
    title: product.title,
    quantity: product.quantity,
    price: product.price,
  }));

  const orderData = {
    ...formData,
    totalAmount: getTotalAmount().toFixed(2),
    totalQty: getTotalQuantity(),
    cart_items,
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if(formData.paymentMethod === "paystack"){
  //    const response = await axios.post("/api/checkout", orderData);
  //   if (response.data.url) {
  //     window.location = response.data.url;
  //   } 
  //   } else if(formData.paymentMethod === "cashOnDelivery"){
  //     const response = await axios.post("/api/cashOnDelivery", orderData);
  //     if(response.data.success){
  //       clearCart();
  //       setIsSuccess(true)
        
  //     }
  //   }
    
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     if (formData.paymentMethod === "paystack") {
  //       const response = await axios.post("/api/checkout", orderData);
  //       if (response.data.url) {
  //         window.location = response.data.url;
  //       }
  //     } else if (formData.paymentMethod === "cashOnDelivery") {
  //       const response = await axios.post("/api/cashOnDelivery", orderData);
  //       if (response.data.success) {
  //         clearCart();
  //         setIsSuccess(true);
  //       }
  //     }
  //   } catch (error) {
  //     // Log the error for debugging purposes
  //     console.error("Error occurred during checkout:", error);
  
  //     // Gracefully handle different types of errors
  //     if (error.response) {
  //       // Server responded with a status code outside the 2xx range
  //       alert(`Error: ${error.response.data.message || "Something went wrong. Please try again."}`);
  //     } else if (error.request) {
  //       // Request was made but no response received
  //       alert("Network error: Unable to connect to the server. Please check your connection.");
  //     } else {
  //       // Something happened in setting up the request
  //       alert("Unexpected error: Please try again later.");
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (formData.paymentMethod === "paystack") {
        const response = await axios.post("/api/checkout", orderData);
  
        if (response.data.url) {
          window.location = response.data.url;
        } else {
          alert(response.data.message || "Payment initialization failed. Please try again.");
        }
      } else if (formData.paymentMethod === "cashOnDelivery") {
        const response = await axios.post("/api/cashOnDelivery", orderData);
  
        if (response.data.success) {
          clearCart();
          setIsSuccess(true);
        } else {
          alert(response.data.message || "Order creation failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error occurred during checkout:", error);
  
      if (error.response) {
        // API returned an error
        alert(
          error.response.data.message ||
            `Server error: ${error.response.status} - ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request made but no response received
        alert("Network error: Unable to connect to the server. Please check your connection.");
      } else {
        // Unexpected client-side error
        alert("Unexpected error: Please try again later.");
      }
    }
  };
  

  // ========================================================

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  if (isSuccess) {
    return (
      <div className={styles["delivery-animation"]}>
        <div className={styles["container"]}>
          <div className={styles["car-wrapper"]}>
            <div className={styles["car-wrapper_inner"]}>
              <div className={styles["car_outter"]}>
                <div className={styles["car"]}>
                  {/* Car body */}
                  <div className={styles["body"]}>
                    <div className={styles["text-container"]}>
                      <h1>Thanks for your order!</h1>
                      <p>Your product is on route.</p>
                    </div>
                  </div>
                  {/* Decorations */}
                  <div className={styles["decos"]}>
                    <div className={styles["line-bot"]}></div>
                    <div className={styles["door"]}>
                      <div className={styles["handle"]}></div>
                      <div className={styles["bottom"]}></div>
                    </div>
                    <div className={styles["window"]}></div>
                    <div className={styles["light"]}></div>
                    <div className={styles["light-front"]}></div>
                    <div className={styles["antenna"]}></div>
                    <div className={styles["ice-cream"]}>
                      <div className={styles["cone"]}></div>
                    </div>
                  </div>
                  {/* Wheels */}
                  <div>
                    <div className={styles["wheel"]}></div>
                    <div className={styles["wheel"]}></div>
                  </div>
                  {/* Wind */}
                  <div className={styles["wind"]}>
                    <div className={`${styles["p"]} ${styles["p1"]}`}></div>
                    <div className={`${styles["p"]} ${styles["p2"]}`}></div>
                    <div className={`${styles["p"]} ${styles["p3"]}`}></div>
                    <div className={`${styles["p"]} ${styles["p4"]}`}></div>
                    <div className={`${styles["p"]} ${styles["p5"]}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background */}
        <div className={styles["background-stuff"]}>
          <div className={styles["bg"]}></div>
          <div className={`${styles["bg"]} ${styles["bg-2"]}`}></div>
          <div className={`${styles["bg"]} ${styles["bg-3"]}`}></div>
          <div className={styles["ground"]}></div>
        </div>
      </div>
    );
    
  }

  <div className={styles["delivery-animation"]}>
  <div className={styles["car"]}>
    <div className={styles["body"]}></div>
    <div className={styles["wheel"]}></div>
    <div className={styles["wheel"]}></div>
    <div className={styles["light"]}></div>
    <div className={styles["light-front"]}></div>
    <div className={styles["antenna"]}></div>
  </div>
</div>
  // =====================================================================

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300">
      <motion.div
        className="container mx-auto px-4 md:px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <motion.div
            className="lg:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">
              Your Cart
            </h2>

            {cartProducts && cartProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Product
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
                    Quantity
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-right">
                    Price
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {cartProducts.map((item) => (
                    <motion.div
                      key={item._id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="grid grid-cols-3 gap-4 py-4 items-center border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <div className="sm:flex-col items-center gap-4">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          src={item.images[0]}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-medium dark:text-white mt-3">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => decrementQuantity(item._id)}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                        >
                          <IoMdRemove />
                        </motion.button>
                        <span className="mx-2 dark:text-white">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => incrementQuantity(item._id)}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                        >
                          <IoMdAdd />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, color: "#ef4444" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromCart(item._id)}
                          className="ml-2 text-red-500"
                        >
                          <FaTrash size={16} />
                        </motion.button>
                      </div>

                      <motion.div
                        className="text-right font-semibold text-primary dark:text-primary-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        ${item.price.toFixed(2)}
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </>
            ) : (
              <motion.p
                variants={itemVariants}
                className="text-center text-gray-500 dark:text-gray-400 py-8"
              >
                Your cart is empty
              </motion.p>
            )}
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">
              Checkout
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone Number", name: "phone", type: "tel" },
                { label: "Address", name: "address", type: "text" },
                { label: "GPS", name: "gps", type: "text" },
                { label: "City", name: "city", type: "text" },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  variants={formControlVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {field.label}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light dark:text-white"
                  />
                </motion.div>
              ))}

              <motion.div variants={formControlVariants} className="mt-6">
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Payment Method
                </label>
                <div className="flex items-center gap-4">
                  {[
                    { value: "paystack", label: "Pay Now" },
                    { value: "cashOnDelivery", label: "Cash on Delivery" },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className="flex items-center gap-2"
                    >
                      <motion.input
                        whileTap={{ scale: 0.95 }}
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={handleInputChange}
                        className="form-radio text-primary dark:text-primary-light"
                      />
                      <span className="text-sm dark:text-gray-300">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={formControlVariants}
                className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6"
              >
                <div className="flex justify-between mb-2">
                  <span className="dark:text-gray-300">Total Quantity:</span>
                  <motion.span
                    className="font-semibold dark:text-white"
                    key={getTotalQuantity()}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getTotalQuantity()}
                  </motion.span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-gray-300">Total Amount:</span>
                  <motion.span
                    className="font-semibold dark:text-white"
                    key={getTotalAmount()}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ${getTotalAmount().toFixed(2)}
                  </motion.span>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: formValid ? 1.02 : 1 }}
                whileTap={formValid ? { scale: 0.98 } : {}}
                className={`w-full bg-primary dark:bg-primary-light text-white py-3 rounded-md mt-6 ${
                  !formValid
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary/90 dark:hover:bg-primary-light/90 transition-colors"
                }`}
                disabled={!formValid}
              >
                {formData.paymentMethod === "paystack" ? "Pay Now" : "Order Now"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;