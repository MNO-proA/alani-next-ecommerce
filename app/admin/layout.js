"use client";

import { useState, useEffect } from "react";
import {
  useAuth,
  useUser,
  ClerkProvider,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import AOS from "aos";
import "aos/dist/aos.css";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import Loader from "@/components/common/Loader";
import Logo from "@/components/Logo";

// export default function AdminLayout({ children }) {
//   const [showNav, setShowNav] = useState(false);

//   useEffect(() => {
//     AOS.init({
//       offset: 100,
//       duration: 800,
//       easing: "ease-in-sine",
//       delay: 100,
//     });
//     AOS.refresh();
//   }, []);

//   return (
//     <ClerkProvider>
//       <SidebarProvider>
//       <SidebarTrigger />
//         <ContentWrapper
//           children={children}
//         />
//       </SidebarProvider>
//     </ClerkProvider>
//   );
// }

// function ContentWrapper({ children }) {
//   const { isSignedIn } = useAuth();

//   if (!isSignedIn) {
//     return (
//       <div className="bg-bgGray w-screen h-screen flex items-center justify-center">
//         <SignInButton mode="modal">
//         <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md">
//           <div className="text-center mb-8">
//             <Logo />
//             <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
//               Welcome Back Admin
//             </h2>
//           </div>
//             <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
//               Login to Alani Admin Panel
//             </button>
//         </div>
//         </SignInButton>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-bgGray min-h-screen">
//       <div className="flex">
//         <Nav />
//         <div className="flex-grow p-4">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }



export default function AdminLayout({ children }) {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <ClerkProvider>
        <ContentWrapper children={children} />
    </ClerkProvider>
  );
}

function ContentWrapper({ children }) {
  const { isSignedIn } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (!isSignedIn) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center justify-center">
        <SignInButton mode="modal">
          <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md">
            <div className="text-center mb-8">
              <Logo />
              <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
                Welcome Back Admin
              </h2>
            </div>
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
              Login to Alani Admin Panel
            </button>
          </div>
        </SignInButton>
      </div>
    );
  }

  return <div>{loading ? <Loader /> : children}</div>;
}
