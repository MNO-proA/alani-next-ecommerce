// "use client";

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import Image from "next/image";

// const CategoryCarousel = () => {
//   const [currentIndexes, setCurrentIndexes] = useState({});
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const { data } = await axios.get("/api/categories");
//       setCategories(data);

//       // Initialize current indexes for each category
//       const initialIndexes = {};
//       data.forEach((category) => {
//         initialIndexes[category._id] = 0;
//       });
//       setCurrentIndexes(initialIndexes);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   useEffect(() => {
//     // Set up interval for rotating images
//     const interval = setInterval(() => {
//       setCurrentIndexes((prev) => {
//         const newIndexes = { ...prev };
//         categories.forEach((category) => {
//           newIndexes[category._id] = (prev[category._id] + 1) % category.images.length;
//         });
//         return newIndexes;
//       });
//     }, 1000); // Change image every 5 seconds

//     return () => clearInterval(interval);
//   }, [categories]);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
//       <div className="container mx-auto py-16 px-4">
//         <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
//           Shop By Category
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent cursor-pointer">
//           {categories.map((category, index) => (
//             <motion.div
//               key={category._id}
//               className={`relative overflow-hidden ${
//                 (index + 1) % 3 === 0 ? "md:col-span-2 h-[500px]" : "h-[450px]"
//               } bg-white dark:bg-gray-800 rounded-lg`}
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//             >
//               {/* Overlay with category name */}
//               <div className="absolute inset-0 bg-black/25 dark:bg-black/30 flex items-center justify-center z-10">
//                 <h3
//                   className={`font-semibold text-white ${
//                     (index + 1) % 3 === 0 ? "text-3xl" : "text-2xl"
//                   } drop-shadow-lg`}
//                 >
//                   {category.name}
//                 </h3>
//               </div>

//               {/* Image Carousel */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentIndexes[category._id]}
//                   className="absolute inset-0 w-full h-full"
//                   initial={{
//                     x: index % 2 === 0 ? "100%" : "-100%",
//                     opacity: 0,
//                   }}
//                   animate={{
//                     x: "0%",
//                     opacity: 1,
//                   }}
//                   exit={{
//                     x: index % 2 === 0 ? "-100%" : "100%",
//                     opacity: 0,
//                   }}
//                   transition={{
//                     type: "tween",
//                     duration: 1,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <Image
//                     src={category.images[currentIndexes[category._id]]}
//                     alt={`${category.name} image ${currentIndexes[category._id] + 1}`}
//                     layout="fill"
//                     objectFit="cover"
//                     unoptimized
//                     priority={index === 0} 
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;

// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import axios from "axios";

// const CategoryCarousel = () => {
//   const [currentIndexes, setCurrentIndexes] = useState({});
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   function fetchCategories() {
//     axios.get("/api/categories").then((result) => {
//       setCategories(result.data);
//     });
//   }

//   useEffect(() => {
//     const initialIndexes = {};
//     categories.forEach((category) => {
//       initialIndexes[category._id] = 0;
//     });
//     setCurrentIndexes(initialIndexes);

//     const interval = setInterval(() => {
//       setCurrentIndexes((prev) => {
//         const newIndexes = { ...prev };
//         categories.forEach((category) => {
//           newIndexes[category._id] =
//             (prev[category._id] + 1) % category.images.length;
//         });
//         return newIndexes;
//       });
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [categories]);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
//       <div className="container mx-auto py-16 px-4">
//         <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
//           Shop By Category
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent cursor-pointer">
//           {categories.map((category, index) => (
//             <Link
//               key={category._id}
//               href={`/store/categories/${category.name}`}
//               passHref
//             >
//               <motion.div
//                 className={`relative overflow-hidden ${
//                   (index + 1) % 3 === 0
//                     ? "md:col-span-2 h-[500px]"
//                     : "h-[450px]"
//                 } bg-white dark:bg-gray-800 rounded-lg`}
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="absolute inset-0 bg-black/25 dark:bg-black/30 flex items-center justify-center z-10">
//                   <h3
//                     className={`font-semibold text-white ${
//                       (index + 1) % 3 === 0 ? "text-3xl" : "text-2xl"
//                     } drop-shadow-lg`}
//                   >
//                     {category.name}
//                   </h3>
//                 </div>

//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={currentIndexes[category._id]}
//                     className="absolute inset-0 w-full h-full"
//                     initial={{
//                       x: index % 2 === 0 ? "100%" : "-100%",
//                       opacity: 0,
//                     }}
//                     animate={{
//                       x: "0%",
//                       opacity: 1,
//                     }}
//                     exit={{
//                       x: index % 2 === 0 ? "-100%" : "100%",
//                       opacity: 0,
//                     }}
//                     transition={{
//                       type: "tween",
//                       duration: 1,
//                       ease: "easeInOut",
//                     }}
//                   >
//                     <img
//                       src={category.images[currentIndexes[category._id]] || "/images/loadingImage.png"}
//                       alt={`${category.name} image ${
//                         currentIndexes[category._id] + 1
//                       }`}
//                       layout="fill"
//                       objectFit="cover"
//                     />
//                   </motion.div>
//                 </AnimatePresence>
//               </motion.div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;


// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import Link from "next/link";
// import { AlertCircle } from "lucide-react";

// const CategoryCarousel = () => {
//   const [currentIndexes, setCurrentIndexes] = useState({});
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

// async function fetchCategories() {
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       // Make sure the API endpoint matches your route configuration
//       const result = await axios.get('/api/categories', {
//         timeout: 10000, // 5 second timeout
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any necessary headers here
//         }
//       });

//       setCategories(result.data);
//     } catch (err) {
//       console.error('Error fetching categories:', err);
//       setError(
//         err.response?.data?.message || 
//         err.message || 
//         'Failed to fetch categories'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchCategories();
//   }, []);

  

//   useEffect(() => {
//     const initialIndexes = {};
//     categories.forEach((category) => {
//       initialIndexes[category._id] = 0;
//     });
//     setCurrentIndexes(initialIndexes);

//     const interval = setInterval(() => {
//       setCurrentIndexes((prev) => {
//         const newIndexes = { ...prev };
//         categories.forEach((category) => {
//           newIndexes[category._id] =
//             (prev[category._id] + 1) % category.images.length;
//         });
//         return newIndexes;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [categories]);

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
//         <div className="container mx-auto py-16 px-4 flex items-center justify-center">
//           <div className="animate-pulse flex flex-col items-center">
//             <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
//               {[1, 2, 3, 4].map((n) => (
//                 <div 
//                   key={n} 
//                   className="h-[450px] bg-gray-200 dark:bg-gray-700 rounded-lg"
//                 ></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
//         <div className="container mx-auto py-16 px-4">
//           <div className="flex flex-col items-center justify-center text-center">
//             <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//               Failed to Load Categories
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
//             <button
//               onClick={fetchCategories}
//               className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main content
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
//       <div className="container mx-auto py-16 px-4">
//         <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
//           Shop By Category
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent">
//           {categories.map((category, index) => (
//             <Link
//               key={category._id}
//               href={`/store/categories/${category.name}`}
//               className="block" // Added to fix passHref deprecation
//             >
//               <motion.div
//                 className={`relative overflow-hidden ${
//                   (index + 1) % 3 === 0
//                     ? "md:col-span-2 h-[500px]"
//                     : "h-[450px]"
//                 } bg-white dark:bg-gray-800 rounded-lg`}
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="absolute inset-0 bg-black/25 dark:bg-black/30 flex items-center justify-center z-10">
//                   <h3
//                     className={`font-semibold text-white ${
//                       (index + 1) % 3 === 0 ? "text-3xl" : "text-2xl"
//                     } drop-shadow-lg`}
//                   >
//                     {category.name}
//                   </h3>
//                 </div>
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={currentIndexes[category._id]}
//                     className="absolute inset-0 w-full h-full"
//                     initial={{
//                       x: index % 2 === 0 ? "100%" : "-100%",
//                       opacity: 0,
//                     }}
//                     animate={{
//                       x: "0%",
//                       opacity: 1,
//                     }}
//                     exit={{
//                       x: index % 2 === 0 ? "-100%" : "100%",
//                       opacity: 0,
//                     }}
//                     transition={{
//                       type: "tween",
//                       duration: 1,
//                       ease: "easeInOut",
//                     }}
//                   >
//                     <img
//                       src={category.images[currentIndexes[category._id]] || "/images/loadingImage.png"}
//                       alt={`${category.name} image ${currentIndexes[category._id] + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </motion.div>
//                 </AnimatePresence>
//               </motion.div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

const CategoryCarousel = () => {
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCategories() {
    try {
      setIsLoading(true);
      setError(null);

      const result = await axios.get("/api/categories", {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCategories(result.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch categories"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categories || categories.length === 0) return;

    const initialIndexes = {};
    categories.forEach((category) => {
      initialIndexes[category._id] = 0;
    });
    setCurrentIndexes(initialIndexes);

    const interval = setInterval(() => {
      setCurrentIndexes((prev) => {
        const newIndexes = { ...prev };
        categories.forEach((category) => {
          newIndexes[category._id] =
            (prev[category._id] + 1) % (category.images?.length || 1);
        });
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [categories]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <div className="container mx-auto py-16 px-4 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-[450px] bg-gray-200 dark:bg-gray-700 rounded-lg"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <div className="container mx-auto py-16 px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Failed to Load Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchCategories}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <div className="container mx-auto py-16 px-4">
          <p className="text-center text-gray-600 dark:text-gray-400">
            No categories available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Shop By Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent">
          {categories.map((category, index) => (
            <Link
              key={category._id}
              href={`/store/categories/${category.name}`}
              className="block"
            >
              <motion.div
                className={`relative overflow-hidden ${
                  (index + 1) % 3 === 0
                    ? "md:col-span-2 h-[500px]"
                    : "h-[450px]"
                } bg-white dark:bg-gray-800 rounded-lg`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-black/25 dark:bg-black/30 flex items-center justify-center z-10">
                  <h3
                    className={`font-semibold text-white ${
                      (index + 1) % 3 === 0 ? "text-3xl" : "text-2xl"
                    } drop-shadow-lg`}
                  >
                    {category.name}
                  </h3>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndexes[category._id]}
                    className="absolute inset-0 w-full h-full"
                    initial={{
                      x: index % 2 === 0 ? "100%" : "-100%",
                      opacity: 0,
                    }}
                    animate={{
                      x: "0%",
                      opacity: 1,
                    }}
                    exit={{
                      x: index % 2 === 0 ? "-100%" : "100%",
                      opacity: 0,
                    }}
                    transition={{
                      type: "tween",
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src={
                        category.images?.[currentIndexes[category._id]] ||
                        "/images/loadingImage.png"
                      }
                      alt={`${category.name || "Category"} image`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
