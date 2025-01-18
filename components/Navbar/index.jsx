// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import { usePathname } from "next/navigation"; // To detect the current route
// import { IoMdSearch } from "react-icons/io";
// import { FaCaretDown } from "react-icons/fa6";
// import { CartContext } from "@/lib/CartContext";
// import DarkMode from "./DarkMode";
// import Link from "next/link";
// import CartModal from "../CartModal";
// import { UserCog } from "lucide-react";
// import CartButton from "../CartButton";

// const Menu = [
//   { id: 1, name: "Home", link: "/" },
//   { id: 2, name: "Products", link: "/store/products" },
// ];

// const DropdownLinks = [
//   { id: 1, name: "Beauty", link: "/#" },
//   { id: 2, name: "Accessories", link: "/#" },
// ];

// const Navbar = ({ setSearchQuery }) => {
//   const { cartProducts } = useContext(CartContext);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const pathname = usePathname(); // Get the current path

//   const handleAdminNavigation = () => {
//     window.location = "/admin";
//   };

//   return (
//     <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
//       <div className="bg-primary/40 py-2">
//         <div className="container flex justify-between items-center">
//           <div>
//             <Link
//               href={"/"}
//               className="font-bold text-2xl sm:text-3xl flex gap-2"
//             >
//               {/* <img src={"/images/logo.png"} alt="Logo" className="w-10" /> */}
//               Alani Beauty Shop
//             </Link>
//           </div>

//           {/* Search and Cart Section */}
//           <div className="flex justify-between items-center gap-4">
//             {pathname === "/store/products" && (
//               <div className="relative group hidden sm:block">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
//                 />
//                 <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
//               </div>
//             )}
//             <CartButton
//               setIsCartOpen={setIsCartOpen}
//               cartProducts={cartProducts}
//             />

//             {/* <button
//               className="hidden sm:flex bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full items-center gap-3 group relative"
//               onClick={handleAdminNavigation}
//             >
//               <span className="group-hover:block hidden transition-all duration-200">
//                 Admin
//               </span>
//               <UserCog className="text-xl text-white drop-shadow-sm cursor-pointer" />
//             </button> */}

//             <DarkMode />
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <ul className="sm:flex hidden items-center gap-4">
//           {Menu.map((data) => (
//             <li key={data.id}>
//               <Link
//                 href={data.link}
//                 className="inline-block px-4 hover:text-primary duration-200"
//               >
//                 {data.name}
//               </Link>
//             </li>
//           ))}
//           <li className="group relative cursor-pointer">
//             <a href="#" className="flex items-center gap-[2px] py-2">
//               Categories
//               <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
//             </a>
//             <div className="absolute hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black dark:bg-gray-950 dark:text-white shadow-md">
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
//       <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//     </div>
//   );
// };

// export default Navbar;
"use client";

import React, { useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // To detect the current route
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa6";
import { CartContext } from "@/lib/CartContext";
import DarkMode from "./DarkMode";
import Link from "next/link";
import CartModal from "../CartModal";
import { UserCog } from "lucide-react";
import CartButton from "../CartButton";
import { useRouter } from "next/navigation";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Products", link: "/store/products" },
];

const Navbar = ({ setSearchQuery }) => {
  const { cartProducts } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  // Fetch categories from your backend or database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories"); // Replace with your actual API endpoint
        const data = await response.json();
        setCategories(data); // Assuming the response is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAdminNavigation = () => {
    router.push("/admin");
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <Link
              href={"/"}
              className="font-bold text-2xl sm:text-3xl flex gap-2"
            >
              {/* <img src={"/images/logo.png"} alt="Logo" className="w-10" /> */}
              Alani Beauty Shop
            </Link>
          </div>

          {/* Search and Cart Section */}
          <div className="flex justify-between items-center gap-4">
            {pathname === "/store/products" && (
              <div className="relative group hidden sm:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                />
                <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
              </div>
            )}
            <div className="hidden md:block">
              <CartButton
                setIsCartOpen={setIsCartOpen}
                cartProducts={cartProducts}
              />
            </div>

            {/* <button
              className="sm:hidden bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group relative"
              onClick={handleAdminNavigation}
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Admin
              </span>
              <UserCog className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button> */}
            <DarkMode />
          </div>
        </div>
      </div>

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
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category._id}>
                      <Link
                        href={`/store/categories/${category.name}`} // Use category name in the link
                        className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="p-2">Loading categories...</li>
                )}
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Navbar;
