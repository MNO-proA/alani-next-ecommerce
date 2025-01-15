
// "use client";

// import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
// import { useEffect, useState, useContext } from "react";
// import Link from "next/link";
// import CartModal from "../CartModal";
// import CartButton from "../CartButton";
// import { CartContext } from "@/lib/CartContext";
// import { usePathname } from 'next/navigation';

// function MobileNavigation() {
//   const { cartProducts } = useContext(CartContext);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const pathname = usePathname();


//   // Scroll to the top when the location (route) changes
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [pathname]);

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
//       <div className="flex justify-around items-center h-16">
//         <Link href="/" className="flex flex-col items-center">
//           <Home
//             className={`w-6 h-6 ${
//               pathname === "/" ? "text-primary" : "text-gray-500"
//             }`}
//           />
//           <span className="text-xs mt-1">Home</span>
//         </Link>
//         <Link href="/store/products" className="flex flex-col items-center">
//           <ShoppingBag
//             className={`w-6 h-6 ${
//               pathname === "/store/products"
//                 ? "text-primary"
//                 : "text-gray-500"
//             }`}
//           />
//           <span className="text-xs mt-1">Products</span>
//         </Link>
//         <Link href="/admin" className="flex flex-col items-center">
//           <User
//             className={`w-6 h-6 ${
//               ["/admin"].includes(pathname)
//                 ? "text-primary"
//                 : "text-gray-500"
//             }`}
//           />
//           <span className="text-xs mt-1">Admin</span>
//         </Link>
//         <CartButton setIsCartOpen={setIsCartOpen} cartProducts={cartProducts} />
//       </div>
//       {/* Cart Modal */}
//       <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//     </div>
//   );
// }

// export default MobileNavigation;
"use client";

import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import CartModal from "../CartModal";
import CartButton from "../CartButton";
import { CartContext } from "@/lib/CartContext";
import { usePathname } from "next/navigation";

function MobileNavigation() {
  const { cartProducts } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();

  // Scroll to the top when the location (route) changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-stone-900 dark:text-white  border-gray-700 md:hidden">
      <div className="flex justify-around items-center h-16">
        {/* Home Link */}
        <Link href="/" className="flex flex-col items-center">
          <Home
            className={`w-6 h-6 ${
              pathname === "/"
                ? "text-primary"
                : "text-gray-600 dark:text-white"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              pathname === "/" ? "text-primary" : "text-gray-600 dark:text-white"
            }`}
          >
            Home
          </span>
        </Link>

        {/* Products Link */}
        <Link href="/store/products" className="flex flex-col items-center">
          <ShoppingBag
            className={`w-6 h-6 ${
              pathname === "/store/products"
                ? "text-primary"
                : "text-gray-600 dark:text-white"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              pathname === "/store/products"
                ? "text-primary"
                : "text-gray-600 dark:text-white"
            }`}
          >
            Products
          </span>
        </Link>

        {/* Admin Link */}
        <Link href="/admin" className="flex flex-col items-center">
          <User
            className={`w-6 h-6 ${
              ["/admin"].includes(pathname)
                ? "text-primary"
                : "text-gray-600 dark:text-white"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              ["/admin"].includes(pathname)
                ? "text-primary"
                : "text-gray-600 dark:text-white"
            }`}
          >
            Admin
          </span>
        </Link>

        {/* Cart Button */}
        <CartButton
          setIsCartOpen={setIsCartOpen}
          cartProducts={cartProducts}
        />
      </div>
      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default MobileNavigation;
