// "use client";
// import React from "react";
// import { motion } from "framer-motion";

// const categories = [
//   {
//     id: 1,
//     title: "Beauty",
//     images: [
//       "images/beauty/beauty1.jpg",
//       "images/beauty/beauty2.jpg",
//       "images/beauty/beauty3.jpg",
//       "images/beauty/beauty4.jpg"
//     ],
//   },
//   {
//     id: 2,
//     title: "Accessories",
//     images: [
//       "images/accessories/access1.jpg",
//       "images/accessories/access2.jpg",
//       "images/accessories/access3.jpg",
//       "images/accessories/access4.jpg",
//       "images/accessories/access5.jpg",
//       "images/accessories/access6.jpg",
//       "images/accessories/access7.jpg",

//     ],
//   },
// ];

// const CategoryCarousel = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
//       <div className="container mx-auto py-16 px-4">
//         <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
//           Shop By Category
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent cursor-pointer">
//           {categories?.map((category, index) => (
//             <motion.div
//               key={category.id}
//               className={`relative overflow-hidden ${
//                 (index + 1) % 3 === 0 ? 'md:col-span-2 h-[500px]' : 'h-[450px]'
//               } bg-white dark:bg-gray-800 rounded-lg`}
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="absolute inset-0 bg-black/25 dark:bg-black/30 flex items-center justify-center z-10">
//                 <h3 className={`font-semibold text-white ${
//                   (index + 1) % 3 === 0 ? 'text-3xl' : 'text-2xl'
//                 } drop-shadow-lg`}>
//                   {category.title}
//                 </h3>
//               </div>

//               <motion.div
//                 className="relative h-full"
//                 animate={{
//                   x: index % 2 === 0
//                     ? ["-100%", "0%", "100%"]
//                     : ["100%", "0%", "-100%"]
//                 }}
//                 transition={{
//                   duration: 15,
//                   repeat: Infinity,
//                   ease: "linear",
//                   repeatType: "loop",
//                 }}
//               >
//                 {category?.images.map((image, imgIndex) => (
//                   <motion.div
//                     key={imgIndex}
//                     className="absolute inset-0 w-full h-full"
//                     initial={{
//                       x: index % 2 === 0 ? "-100%" : "100%"
//                     }}
//                     animate={{ x: "0%" }}
//                     exit={{
//                       x: index % 2 === 0 ? "100%" : "-100%"
//                     }}
//                     transition={{
//                       duration: 15,
//                       delay: imgIndex * 5,
//                     }}
//                   >
//                     <img
//                       src={image}
//                       alt={`${category.title} image ${imgIndex + 1}`}
//                       className="w-full h-full object-cover brightness-100"
//                     />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;

"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const categories = [
  {
    id: 1,
    title: "Beauty",
    images: [
      "images/beauty/beauty1.jpg",
      "images/beauty/beauty2.jpg",
      "images/beauty/beauty3.jpg",
      "images/beauty/beauty4.jpg"
    ],
  },
  {
    id: 2,
    title: "Accessories",
    images: [
      "images/accessories/access1.jpg",
      "images/accessories/access2.jpg",
      "images/accessories/access3.jpg",
      "images/accessories/access4.jpg",
      "images/accessories/access5.jpg",
      "images/accessories/access6.jpg",
      "images/accessories/access7.jpg",
    ],
  },
];

const CategoryCarousel = () => {
  const [currentIndexes, setCurrentIndexes] = useState({});

  useEffect(() => {
    // Initialize current indexes for each category
    const initialIndexes = {};
    categories.forEach(category => {
      initialIndexes[category.id] = 0;
    });
    setCurrentIndexes(initialIndexes);

    // Set up interval for rotating images
    const interval = setInterval(() => {
      setCurrentIndexes(prev => {
        const newIndexes = { ...prev };
        categories.forEach(category => {
          newIndexes[category.id] = (prev[category.id] + 1) % category.images.length;
        });
        return newIndexes;
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Shop By Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent cursor-pointer">
          {categories?.map((category, index) => (
            <motion.div
              key={category.id}
              className={`relative overflow-hidden ${
                (index + 1) % 3 === 0 ? 'md:col-span-2 h-[500px]' : 'h-[450px]'
              } bg-white dark:bg-gray-800 rounded-lg`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/25 dark:bg-black/30 flex items-center justify-center z-10">
                <h3 className={`font-semibold text-white ${
                  (index + 1) % 3 === 0 ? 'text-3xl' : 'text-2xl'
                } drop-shadow-lg`}>
                  {category.title}
                </h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndexes[category.id]}
                  className="absolute inset-0 w-full h-full"
                  initial={{ 
                    x: index % 2 === 0 ? "100%" : "-100%",
                    opacity: 0 
                  }}
                  animate={{ 
                    x: "0%",
                    opacity: 1 
                  }}
                  exit={{ 
                    x: index % 2 === 0 ? "-100%" : "100%",
                    opacity: 0 
                  }}
                  transition={{
                    type: "tween",
                    duration: 1,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src={category.images[currentIndexes[category.id]]}
                    alt={`${category.title} image ${currentIndexes[category.id] + 1}`}
                    className="w-full h-full object-cover brightness-100"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;