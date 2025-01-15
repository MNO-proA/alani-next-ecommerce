import React from 'react';

const LoadingDots = () => {
  return (
    <span className="inline-flex items-center">
      <span className="w-1 h-1 rounded-full bg-current animate-dot1 mx-0.5"></span>
      <span className="w-1 h-1 rounded-full bg-current animate-dot2 mx-0.5"></span>
      <span className="w-1 h-1 rounded-full bg-current animate-dot3 mx-0.5"></span>
    </span>
  );
};

export default LoadingDots;

// Add these animations to your globals.css or tailwind config
// @keyframes dot1 {
//   0%, 100% { opacity: 0.4; transform: scale(0.8); }
//   50% { opacity: 1; transform: scale(1); }
// }
// @keyframes dot2 {
//   0%, 100% { opacity: 0.4; transform: scale(0.8); }
//   50% { opacity: 1; transform: scale(1); }
//   0% { animation-delay: 0.1s; }
// }
// @keyframes dot3 {
//   0%, 100% { opacity: 0.4; transform: scale(0.8); }
//   50% { opacity: 1; transform: scale(1); }
//   0% { animation-delay: 0.2s; }
// }