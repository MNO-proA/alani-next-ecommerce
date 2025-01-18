// "use client"

// import { useEffect, useState } from "react";

// const DarkMode = () => {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setTheme(savedTheme);
//     } else {
//       setTheme("light");
//     }
//   }, []);

//   // const element = document.documentElement; // html element

//   useEffect(() => {
//     const element = document.documentElement;
//     if (theme === "dark") {
//       element.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       element.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [theme]);

//   return (
//     <div className="relative">
//       <img
//         src={"/images/website/light-mode-button.png"}
//         alt=""
//         onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//         className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 ${
//           theme === "dark" ? "opacity-0" : "opacity-100"
//         } `}
//       />
//       <img
//         src={"/images/website/dark-mode-button.png"}
//         alt=""
//         onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//         className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300"
//       />
//     </div>
//   );
// };

// export default DarkMode;

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const DarkMode = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    setMounted(true);
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(savedTheme);
  }, []);

  // Update theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme, mounted]);

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Prevent flash of incorrect theme
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group relative"
    >
    
      <Sun
        className={`w-6 h-6 transition-all duration-300 absolute 
          ${theme === "dark" ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
      />

      <Moon
        className={`w-6 h-6 transition-all duration-300
          ${
            theme === "light" ? "opacity-0 scale-50" : "opacity-100 scale-100"
          }`}
      />
        {/* <span className="group-hover:block hidden transition-all duration-200">
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </span> */}
    </button>
  );
};

export default DarkMode;
