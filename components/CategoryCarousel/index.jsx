

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
      // <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      //   <div className="container mx-auto py-16 px-4 flex items-center justify-center">
      //     <div className="animate-pulse flex flex-col items-center">
      //       <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
      //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      //         {[1, 2, 3, 4].map((n) => (
      //           <div
      //             key={n}
      //             className="h-[450px] bg-gray-200 dark:bg-gray-700 rounded-lg"
      //           ></div>
      //         ))}
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="container mx-auto py-16 px-4">
             <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-8"></div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`relative ${
                    n === 3 ? "md:col-span-2 h-[500px]" : "h-[450px]"
                  } animate-pulse`}
                >
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-shimmer"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              ))}
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
        {/* <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Shop By Category
        </h2> */}
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


// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import Link from "next/link";
// import { AlertCircle } from "lucide-react";
// import Image from "next/image";

// const CategoryCarousel = () => {
//   const [currentIndexes, setCurrentIndexes] = useState({});
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageLoadStatus, setImageLoadStatus] = useState({});

//   async function fetchCategories() {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const result = await axios.get("/api/categories", {
//         timeout: 15000,
//         headers: {
//           "Cache-Control": "no-cache",
//           "Pragma": "no-cache",
//           "Expires": "0",
//         },
//       });

//       const categoriesWithPreloadedImages = result.data;
//       // Start preloading images
//       categoriesWithPreloadedImages.forEach(category => {
//         if (category.images && category.images.length > 0) {
//           category.images.forEach(imageUrl => {
//             const img = new Image();
//             img.src = imageUrl;
//             img.onload = () => {
//               setImageLoadStatus(prev => ({
//                 ...prev,
//                 [imageUrl]: 'loaded'
//               }));
//             };
//             img.onerror = () => {
//               setImageLoadStatus(prev => ({
//                 ...prev,
//                 [imageUrl]: 'error'
//               }));
//             };
//           });
//         }
//       });

//       setCategories(categoriesWithPreloadedImages);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to fetch categories"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (!categories || categories.length === 0) return;

//     const initialIndexes = {};
//     categories.forEach((category) => {
//       initialIndexes[category._id] = 0;
//     });
//     setCurrentIndexes(initialIndexes);

//     const interval = setInterval(() => {
//       setCurrentIndexes((prev) => {
//         const newIndexes = { ...prev };
//         categories.forEach((category) => {
//           if (category.images?.length > 1) {  // Only rotate if there are multiple images
//             newIndexes[category._id] =
//               (prev[category._id] + 1) % category.images.length;
//           }
//         });
//         return newIndexes;
//       });
//     }, 5000); // Increased to 5 seconds for better viewing

//     return () => clearInterval(interval);
//   }, [categories]);

//   const LoadingSkeleton = () => (
//     <div className="container mx-auto py-16 px-4">
//       <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-8"></div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {[1, 2, 3, 4].map((n) => (
//           <div
//             key={n}
//             className={`relative ${
//               n === 3 ? "md:col-span-2 h-[500px]" : "h-[450px]"
//             } animate-pulse`}
//           >
//             <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-shimmer"></div>
//             </div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="h-8 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
//         <LoadingSkeleton />
//       </div>
//     );
//   }

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
//               className={`block ${
//                 (index + 1) % 3 === 0 ? "md:col-span-2" : ""
//               }`}
//             >
//               <motion.div
//                 className={`relative overflow-hidden ${
//                   (index + 1) % 3 === 0 ? "h-[500px]" : "h-[450px]"
//                 } bg-white dark:bg-gray-800 rounded-lg`}
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20 flex items-center justify-center z-10">
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
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <div className="relative w-full h-full">
//                       <img
//                         src={
//                           category.images?.[currentIndexes[category._id]] ||
//                           "/images/placeholder.jpg"
//                         }
//                         alt={category.name}
//                         className="w-full h-full object-cover transform scale-105"
//                         style={{ 
//                           opacity: imageLoadStatus[category.images?.[currentIndexes[category._id]]] === 'loaded' ? 1 : 0,
//                           transition: 'opacity 0.5s ease-in-out'
//                         }}
//                         onLoad={(e) => {
//                           e.target.style.opacity = 1;
//                         }}
//                       />
//                       {/* Blur hash or low-quality placeholder */}
//                       {(!imageLoadStatus[category.images?.[currentIndexes[category._id]]] || 
//                         imageLoadStatus[category.images?.[currentIndexes[category._id]]] !== 'loaded') && (
//                         <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
//                       )}
//                     </div>
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