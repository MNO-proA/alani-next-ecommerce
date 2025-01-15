

"use client"

import React from "react";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    img: "/images/hero/women.png",
    title: "Upto 50% off on all Men's Wear",
    description:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: "/images/hero/shopping.png",
    title: "30% off on all Women's Wear",
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: "/images/hero/sale.png",
    title: "70% off on all Products Sale",
    description:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const HeroWithVideoBanner = () => {
  let settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <>
      {/* Video Banner */}
      <div className="relative w-full h-[650px] sm:h-[750px]">
        <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
        >
          <source src="/videos/alani-beauty.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h2 className="text-4xl sm:text-6xl font-semibold mb-4">
            Limited Time Offers!
          </h2>
          <p className="text-lg mb-6">
            Shop the latest styles at amazing discounts!
          </p>
          <button className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-6 rounded-full hover:scale-105 duration-200">
            Shop Now
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
        {/* background pattern */}
        <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-[8]"></div>
        {/* hero section */}
        <div className="container pb-8 sm:pb-0">
          <Slider {...settings}>
            {ImageList.map((data) => (
              <div key={data.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* text content section */}
                  <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                    <h1
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                    >
                      {data.title}
                    </h1>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-delay="100"
                      className="text-sm"
                    >
                      {data.description}
                    </p>
                    <div
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-delay="300"
                    >
                      <button
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                  {/* image section */}
                  <div className="order-1 sm:order-2">
                    <div
                      data-aos="zoom-in"
                      data-aos-once="true"
                      className="relative z-10"
                    >
                      <img
                        src={data.img}
                        alt=""
                        className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default HeroWithVideoBanner;
// "use client";

// import React, { useState } from "react";
// import Slider from "react-slick";
// import Image from "next/image";
// import Link from "next/link";

// const ImageList = [
//   {
//     id: 1,
//     img: "/images/hero/women.png",
//     title: "Upto 50% off on all Men's Wear",
//     description:
//       "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     id: 2,
//     img: "/images/hero/shopping.png",
//     title: "30% off on all Women's Wear",
//     description:
//       "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     id: 3,
//     img: "/images/hero/sale.png",
//     title: "70% off on all Products Sale",
//     description:
//       "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
// ];

// const HeroWithVideoBanner = () => {
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);

//   const settings = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     cssEase: "ease-in-out",
//     pauseOnHover: false,
//     pauseOnFocus: true,
//     responsive: [
//       {
//         breakpoint: 640,
//         settings: {
//           autoplaySpeed: 3000,
//           speed: 600,
//         }
//       }
//     ]
//   };

//   return (
//     <>
//       {/* Video Banner */}
//       <div className="relative w-full h-[650px] sm:h-[750px] bg-gray-900">
//         <video
//           className={`object-cover w-full h-full transition-opacity duration-1000 ${
//             isVideoLoaded ? "opacity-100" : "opacity-0"
//           }`}
//           autoPlay
//           loop
//           muted
//           playsInline
//           preload="auto"
//           onLoadedData={() => setIsVideoLoaded(true)}
//         >
//           <source src="/videos/alani-beauty.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
//           <h2 className="text-4xl sm:text-6xl font-semibold mb-4">
//             Limited Time Offers!
//           </h2>
//           <p className="text-lg mb-6">
//             Shop the latest styles at amazing discounts!
//           </p>
//           <Link 
//             href="/store/products"
//             className="inline-block bg-gradient-to-r from-primary to-secondary text-white py-2 px-6 rounded-full hover:scale-105 duration-200"
//           >
//             Shop Now
//           </Link>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">
//         {/* Background pattern */}
//         <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-[8]" />
        
//         {/* Hero section */}
//         <div className="container pb-8 sm:pb-0">
//           <Slider {...settings}>
//             {ImageList.map((data, index) => (
//               <div key={data.id}>
//                 <div className="grid grid-cols-1 sm:grid-cols-2">
//                   {/* Text content section */}
//                   <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
//                     <h1
//                       data-aos="zoom-out"
//                       data-aos-duration="500"
//                       data-aos-once="true"
//                       className="text-5xl sm:text-6xl lg:text-7xl font-bold"
//                     >
//                       {data.title}
//                     </h1>
//                     <p
//                       data-aos="fade-up"
//                       data-aos-duration="500"
//                       data-aos-delay="100"
//                       className="text-sm"
//                     >
//                       {data.description}
//                     </p>
//                     <div
//                       data-aos="fade-up"
//                       data-aos-duration="500"
//                       data-aos-delay="300"
//                     >
//                       <Link
//                         href="/store/products"
//                         className="inline-block bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
//                       >
//                         Order Now
//                       </Link>
//                     </div>
//                   </div>
                  
//                   {/* Image section */}
//                   <div className="order-1 sm:order-2">
//                     <div
//                       data-aos="zoom-in"
//                       data-aos-once="true"
//                       className="relative z-10"
//                     >
//                       <Image
//                         src={data.img}
//                         alt={data.title}
//                         width={450}
//                         height={450}
//                         priority={index === 0}
//                         className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HeroWithVideoBanner;