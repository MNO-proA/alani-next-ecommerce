"use client";

// import React from "react";
// // import Logo from "../../assets/logo.png";
// import { IoMdSearch } from "react-icons/io";
// import { FaCartShopping } from "react-icons/fa6";
// import { FaCaretDown } from "react-icons/fa";
// import DarkMode from "./DarkMode";
// import Link from "next/link";

// const Menu = [
//   {
//     id: 1,
//     name: "Home",
//     link: "/",
//   },
//   {
//     id: 2,
//     name: "Products",
//     link: "/products",
//   },

// ];

// const DropdownLinks = [
//   {
//     id: 1,
//     name: "Beauty",
//     link: "/#",
//   },
//   {
//     id: 2,
//     name: "Accessories",
//     link: "/#",
//   },

// ];

// const Navbar = () => {
//   return (
//     <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
//       {/* upper Navbar */}
//       <div className="bg-primary/40 py-2">
//         <div className="container flex justify-between items-center">
//           <div>
//             <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
//               <img src={"images/logo.png"} alt="Logo" className="w-10" />
//               Alani Beauty Shop
//             </a>
//           </div>

//           {/* search bar */}
//           <div className="flex justify-between items-center gap-4">
//             <div className="relative group hidden sm:block">
//               <input
//                 type="text"
//                 placeholder="search"
//                 className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
//               />
//               <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
//             </div>

//             {/* order button */}
//             <button

//               className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
//             >
//               <span className="group-hover:block hidden transition-all duration-200">
//                 Cart
//               </span>
//               <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
//             </button>

//             {/* Darkmode Switch */}
//             <div>
//               <DarkMode />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* lower Navbar */}
//       <div data-aos="zoom-in" className="flex justify-center">
//         <ul className="sm:flex hidden items-center gap-4">
//           {Menu.map((data) => (
//             <li key={data.id}>
//               <a
//                 href={data.link}
//                 className="inline-block px-4 hover:text-primary duration-200"
//               >
//                 {data.name}
//               </a>
//             </li>
//           ))}
//           {/* Simple Dropdown and Links */}
//           <li className="group relative cursor-pointer">
//             <a href="#" className="flex items-center gap-[2px] py-2">
//               Categories
//               <span>
//                 <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
//               </span>
//             </a>
//             <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black  dark:bg-gray-950 dark:text-white shadow-md">
//               <ul>
//                 {DropdownLinks.map((data) => (
//                   <li key={data.id}>
//                     <Link
//                       href={data.link}
//                       className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
//                     >
//                       {data.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// "use client";

// import React, { useState } from "react";
// import { IoMdSearch } from "react-icons/io";
// import { FaCartShopping, FaCaretDown } from "react-icons/fa6";
// import CartModal from "../CartModal";
// import { motion, AnimatePresence } from "framer-motion";
// import DarkMode from "./DarkMode";
// import Link from "next/link";

// const Menu = [
//   {
//     id: 1,
//     name: "Home",
//     link: "/",
//   },
//   {
//     id: 2,
//     name: "Products",
//     link: "/products",
//   },
// ];

// const DropdownLinks = [
//   {
//     id: 1,
//     name: "Beauty",
//     link: "/#",
//   },
//   {
//     id: 2,
//     name: "Accessories",
//     link: "/#",
//   },
// ];

// const Navbar = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "Sample Product",
//       price: 29.99,
//       quantity: 1,
//       image: "/images/shirt/shirt.png"
//     },
//   ]);

//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCartItems(items =>
//       items.map(item =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems(items => items.filter(item => item.id !== id));
//   };

//   const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
//       {/* upper Navbar */}
//       <div className="bg-primary/40 py-2">
//         <div className="container flex justify-between items-center">
//           <div>
//             <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
//               <img src={"images/logo.png"} alt="Logo" className="w-10" />
//               Alani Beauty Shop
//             </a>
//           </div>

//           {/* search bar */}
//           <div className="flex justify-between items-center gap-4">
//             <div className="relative group hidden sm:block">
//               <input
//                 type="text"
//                 placeholder="search"
//                 className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
//               />
//               <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
//             </div>

//             {/* Cart button */}
//             <button
//               onClick={() => setIsCartOpen(true)}
//               className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group relative"
//             >
//               <span className="group-hover:block hidden transition-all duration-200">
//                 Cart
//               </span>
//               <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
//               {cartItemsCount > 0 && (
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
//                 >
//                   {cartItemsCount}
//                 </motion.div>
//               )}
//             </button>

//             {/* Darkmode Switch */}
//             <div>
//               <DarkMode />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* lower Navbar */}
//       <div data-aos="zoom-in" className="flex justify-center">
//         <ul className="sm:flex hidden items-center gap-4">
//           {Menu.map((data) => (
//             <li key={data.id}>
//               <a
//                 href={data.link}
//                 className="inline-block px-4 hover:text-primary duration-200"
//               >
//                 {data.name}
//               </a>
//             </li>
//           ))}
//           {/* Simple Dropdown and Links */}
//           <li className="group relative cursor-pointer">
//             <a href="#" className="flex items-center gap-[2px] py-2">
//               Categories
//               <span>
//                 <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
//               </span>
//             </a>
//             <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black dark:bg-gray-950 dark:text-white shadow-md">
//               <ul>
//                 {DropdownLinks.map((data) => (
//                   <li key={data.id}>
//                     <Link
//                       href={data.link}
//                       className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
//                     >
//                       {data.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </li>
//         </ul>
//       </div>

//       {/* Cart Modal */}
//       <CartModal
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//         cartItems={cartItems}
//         updateQuantity={updateQuantity}
//         removeItem={removeItem}
//       />
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaCaretDown } from "react-icons/fa6";
import { motion } from "framer-motion";
import { CartContext } from "@/lib/CartContext";
import DarkMode from "./DarkMode";
import Link from "next/link";
import CartModal from "../CartModal";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Products", link: "/products" },
];

const DropdownLinks = [
  { id: 1, name: "Beauty", link: "/#" },
  { id: 2, name: "Accessories", link: "/#" },
];

const Navbar = () => {
  const { cartProducts } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={"images/logo.png"} alt="Logo" className="w-10" />
              Alani Beauty Shop
            </a>
          </div>

          {/* Search and Cart Section */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* Cart Button */}
            <button className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group relative"
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

            {/* Darkmode Switch */}
            <DarkMode />
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <Link
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </Link>
            </li>
          ))}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Categories
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </a>
            <div className="absolute hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black dark:bg-gray-950 dark:text-white shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <Link
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Navbar;
