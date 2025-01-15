import React from "react";
// import Banner from "../../assets/website/orange-pattern.jpg";

const BannerImg = {
  backgroundImage: "url('/images/website/orange-pattern.jpg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Subscribe = () => {
  return (
    <div
      data-aos="zoom-in"
      className="mb-20 bg-gray-100 dark:bg-gray-800 text-white "
      style={BannerImg}
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto">
          <h1 className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold">
            Get Notified About New Products
          </h1>
          <input
            data-aos="fade-up"
            type="text"
            placeholder="Enter your email"
            className="w-full p-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;

// "use client";
// import React from "react";

// const Subscribe = () => {
//   return (
//     <div
//       data-aos="zoom-in"
//       className="mb-20 bg-gray-100 dark:bg-gray-800 text-white bg-[url('/images/website/orange-pattern.jpg')] bg-center bg-no-repeat bg-cover relative"
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
      
//       {/* Content */}
//       <div className="container py-10 relative z-10">
//         <div className="space-y-6 max-w-xl mx-auto">
//           <h1 className="text-2xl text-center sm:text-left sm:text-4xl font-semibold">
//             Get Notified About New Products
//           </h1>
//           <input
//             data-aos="fade-up"
//             type="text"
//             placeholder="Enter your email"
//             className="w-full p-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Subscribe;
