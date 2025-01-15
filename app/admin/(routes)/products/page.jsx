"use client";
// import Link from "next/link";
// import {useEffect, useState} from "react";
// import axios from "axios";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

// export default function Products() {
//   const [products,setProducts] = useState([]);
//   useEffect(() => {
//     axios.get('/api/products').then(response => {
//       setProducts(response.data);
//     });
//   }, []);
//   return (
//     <DefaultLayout>
//       <Link className="btn-primary" href={'/admin/products/new'}>Add new product</Link>
//       <table className="basic mt-2">
//         <thead>
//           <tr>
//             <td>Product name</td>
//             <td></td>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product._id}>
//               <td>{product.title}</td>
//               <td>
//                 <Link className="btn-default" href={'/admin/products/edit/'+product._id}>
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
//                   </svg>
//                   Edit
//                 </Link>
//                 <Link className="btn-red" href={'/admin/products/delete/'+product._id}>
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//                   </svg>
//                   Delete
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </DefaultLayout>
//   );
// }

// "use client";

// import Layout from "@/app/admin/layout";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null); // To store error state

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("/api/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setError("Failed to load products. Please try again later.");
//         alert("Failed to load products. Please try again later.");
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <>
//       <Link className="btn-primary" href={"/products/new"}>
//         Add new product
//       </Link>
//       {error && <p className="text-red-600">{error}</p>}{" "}
//       {/* Show error message */}
//       <table className="basic mt-2">
//         <thead>
//           <tr>
//             <td>Product name</td>
//             <td></td>
//           </tr>
//         </thead>
//         <tbody>
//           {products.length > 0 ? (
//             products.map((product) => (
//               <tr key={product._id}>
//                 <td>{product.title}</td>
//                 <td>
//                   <Link
//                     className="btn-default"
//                     href={"/products/edit/" + product._id}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-4 h-4"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
//                       />
//                     </svg>
//                     Edit
//                   </Link>
//                   <Link
//                     className="btn-red"
//                     href={"/products/delete/" + product._id}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-4 h-4"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                       />
//                     </svg>
//                     Delete
//                   </Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="2" className="text-center">
//                 No products found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { PlusCircle, Pencil, Trash2, Package } from "lucide-react";
import { motion } from "framer-motion";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="p-4 md:p-6 bg-gray-2 min-h-screen">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-title-lg font-bold text-black">Products</h1>
            <p className="text-body mt-1">Manage your product inventory</p>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-primaryAdmin text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg"
          >
            <PlusCircle size={20} />
            <span>Add New Product</span>
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-2 border-b border-stroke">
                  <th className="py-5 px-6 text-left font-medium text-black">
                    Product
                  </th>
                  <th className="py-5 px-6 text-left font-medium text-black">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <motion.tr
                    key={product._id}
                    variants={itemVariants}
                    className="border-b border-stroke hover:bg-gray-2 transition-colors duration-200"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-3 rounded-lg flex items-center justify-center">
                          <Package className="text-primaryAdmin" />
                        </div>
                        <span className="font-medium text-black">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/products/edit/${product._id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray text-black hover:bg-gray-300 transition-colors duration-200"
                        >
                          <Pencil size={16} />
                          <span>Edit</span>
                        </Link>
                        <Link
                          href={`/admin/products/delete/${product._id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-danger text-white hover:bg-opacity-90 transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DefaultLayout>
  );
}
