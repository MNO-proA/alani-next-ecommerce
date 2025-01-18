// "use client"

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from "framer-motion";


// const ProductImageCarousel = ({ images }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isAnimating, setIsAnimating] = useState(false);
  
//     useEffect(() => {
//       if (images.length <= 1) return;
  
//       const interval = setInterval(() => {
//         if (!isAnimating) {
//           setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }
//       }, 5000);
  
//       return () => clearInterval(interval);
//     }, [images.length, isAnimating]);
  
//     return (
//       <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 relative group">
//         <div className="relative overflow-hidden">
//           <AnimatePresence mode="wait" initial={false}>
//             <motion.img
//               key={currentIndex}
//               src={images[currentIndex]}
//               alt={`Product image ${currentIndex + 1}`}
//               className="max-w-sm mx-auto drop-shadow-md"
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -100 }}
//               transition={{
//                 duration: 0.8,
//                 ease: "easeInOut"
//               }}
//               onAnimationStart={() => setIsAnimating(true)}
//               onAnimationComplete={() => setIsAnimating(false)}
//             />
//           </AnimatePresence>
//         </div>
        
//         {/* Image Navigation Dots */}
//         {images.length > 1 && (
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                   currentIndex === index 
//                     ? 'bg-primary w-4' 
//                     : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//                 onClick={() => setCurrentIndex(index)}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   export default ProductImageCarousel;




  "use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const ProductImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isAnimating]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 relative group">
      <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[16/9] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <img
              src={images[currentIndex]}
              alt={`Product image ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-primary w-4'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageCarousel;