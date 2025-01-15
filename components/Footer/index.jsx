import React from "react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: "url('/images/website/footer-pattern.jpg')",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};


const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "Products",
    link: "/products",
  },
  {
    title: "Categories",
    link: "/#contact",
  },
  
];

const Footer = () => {
  return (
    <div style={BannerImg} className="text-white">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={"/images/logo.png"} alt="" className="max-w-[50px]" />
              Alani Beauty Shop
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in
              beatae ea recusandae blanditiis veritatis.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            {/* <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* social links */}

            <div>
              <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>Accra, Ghana</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+233556056596</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

// "use client";

// import React from "react";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaLocationArrow,
//   FaMobileAlt,
// } from "react-icons/fa";

// const FooterLinks = [
//   { title: "Home", link: "/#" },
//   { title: "Products", link: "/products" },
//   { title: "Categories", link: "/#contact" },
// ];

// const Footer = () => {
//   return (
//     <div
//       data-aos="zoom-in"
//       className="text-white bg-[url('/images/website/footer-pattern.jpg')] bg-bottom bg-no-repeat bg-cover relative"
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />

//       {/* Content */}
//       <div className="container relative z-10 py-10">
//         <div className="grid md:grid-cols-3 gap-10">
//           {/* Company Details */}
//           <div className="space-y-4">
//             <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
//               <img
//                 src="/images/logo.png"
//                 alt="Logo"
//                 className="w-12 h-12 object-contain"
//               />
//               Alani Beauty Shop
//             </h1>
//             <p className="text-gray-200">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in
//               beatae ea recusandae blanditiis veritatis.
//             </p>
//           </div>

//           {/* Footer Links */}
//           <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
//             {["Important Links", "Links"].map((section, index) => (
//               <div key={index}>
//                 <h1 className="text-xl font-semibold mb-4">{section}</h1>
//                 <ul className="space-y-3">
//                   {FooterLinks.map((link) => (
//                     <li
//                       key={link.title}
//                       className="hover:text-primary duration-200 cursor-pointer text-gray-200"
//                     >
//                       {link.title}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* Social Links & Contact Info */}
//           <div className="space-y-6">
//             {/* Social Icons */}
//             <div className="flex items-center gap-4">
//               <a href="#" className="hover:text-primary">
//                 <FaInstagram className="text-3xl" />
//               </a>
//               <a href="#" className="hover:text-primary">
//                 <FaFacebook className="text-3xl" />
//               </a>
//               <a href="#" className="hover:text-primary">
//                 <FaLinkedin className="text-3xl" />
//               </a>
//             </div>
//             {/* Contact Info */}
//             <div className="space-y-3 text-gray-200">
//               <div className="flex items-center gap-3">
//                 <FaLocationArrow />
//                 <span>Accra, Ghana</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaMobileAlt />
//                 <span>+233556056596</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;
