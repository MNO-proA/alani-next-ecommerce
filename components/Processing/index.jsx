// // import React, { useEffect } from 'react'
// // import axios from 'axios';

// // const ProcessingPage = () => {
// //   useEffect(
// //     ()=>{
// //       setTimeout(() => {
// //         const fetchOrders = async () => {
// //           try {
// //             const res = await axios.get('/api/orders');
// //             if(res.data.paystackStatus ===  "success"){
// //               window.location.href = process.env.PUBLIC_URL + '/checkout?success=1'
// //             }
// //           } catch (error) {
// //             console.error('Error fetching orders:', error);
// //             setError('Failed to load orders. Please try again later.');
// //           }
// //         };
// //         fetchOrders();
    
// //   }, 4000);
// //     }
// //   )[]
  

// //   return (
// //     <div>Processing Payment..., wait for a second</div>
// //   )
// // }

// // export default ProcessingPage

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { Loader2 } from "lucide-react";

// const ProcessingPage = () => {
//   const router = useRouter();
//   const [error, setError] = useState('');
//   const { reference } = router.query; // Assuming you pass the payment reference in URL

//   useEffect(() => {
//     let timeoutId;
//     let attempts = 0;
//     const maxAttempts = 5;

//     const checkPaymentStatus = async () => {
//       try {
//         if (!reference) return; // Don't make API call without reference

//         console.lg(reference)
//         const res = await axios.get(`/api/orders/${reference}`);
        
//         if (res.data.paystackStatus === "success" && res.data.paymentStatus === 'completed') {
//           router.push('/store/checkout?success=1');
//         } else if (res.data.paystackStatus === "failed") {
//           router.push('/store/checkout?failed=1');
//         } else {
//           // Payment still processing
//           attempts++;
//           if (attempts < maxAttempts) {
//             timeoutId = setTimeout(checkPaymentStatus, 4000);
//           } else {
//             setError('Payment verification timeout. Please recharge your account.');
//             router.push('/store/checkout');
//           }
//         }
//       } catch (error) {
//         console.error('Error checking payment status:', error);
//         setError('Failed to verify payment status.');
//       }
//     };

//     checkPaymentStatus();

//     // Cleanup timeout on unmount
//     return () => {
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, [reference, router]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       {!error ? (
//         <>
//           <Loader2 className="h-8 w-8 animate-spin mb-4" />
//           <h2 className="text-xl font-semibold mb-2">Processing Your Payment</h2>
//           <p className="text-gray-600">Please wait while we verify your payment...</p>
//         </>
//       ) : (
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button 
//             onClick={() => router.push('/store/checkout')}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Return to Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProcessingPage;

// // https://alani-next-ecommerce.onrender.com/store/checkout?processing=1&trxref=ORDER-1737478120987-9a981366-4b13-4ce8-988f-57d386234dc5&reference=ORDER-1737478120987-9a981366-4b13-4ce8-988f-57d386234dc5

// import React, { useEffect, useState } from 'react';
// import { Loader2 } from "lucide-react";

// const ProcessingPage = () => {
//     const [error, setError] = useState('');
    
//     useEffect(() => {
//         // Get reference from URL parameters
//         const urlParams = new URLSearchParams(window.location.search);
//         const reference = urlParams.get('reference');
//         const trxref = urlParams.get('trxref');
        
//         if (!reference && !trxref) {
//             setError('Invalid payment reference');
//             return;
//         }

//         let timeoutId;
//         let attempts = 0;
//         const maxAttempts = 5;

//         const checkPaymentStatus = async () => {
//             try {
//                 const response = await fetch(`/api/orders/${reference || trxref}`);
//                 const data = await response.json();

//                 if (data.paystackStatus === "success" && data.paymentStatus === 'completed') {
//                     window.location.href = '/store/checkout?success=1';
//                 } else if (data.paystackStatus === "failed") {
//                     window.location.href = '/store/checkout?failed=1';
//                 } else {
//                     attempts++;
//                     if (attempts < maxAttempts) {
//                         timeoutId = setTimeout(checkPaymentStatus, 4000);
//                     } else {
//                         setError('Payment verification timeout. Please check your account.');
//                         setTimeout(() => {
//                             window.location.href = '/store/checkout';
//                         }, 3000);
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error checking payment status:', error);
//                 setError('Failed to verify payment status');
//                 setTimeout(() => {
//                     window.location.href = '/store/checkout';
//                 }, 3000);
//             }
//         };

//         checkPaymentStatus();

//         return () => {
//             if (timeoutId) clearTimeout(timeoutId);
//         };
//     }, []);

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center p-4">
//             {!error ? (
//                 <div className="text-center">
//                     <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
//                     <h2 className="text-xl font-semibold mb-2">Processing Your Payment</h2>
//                     <p className="text-gray-600">Please wait while we verify your payment...</p>
//                 </div>
//             ) : (
//                 <div className="text-center">
//                     <p className="text-red-600 mb-4">{error}</p>
//                     <button 
//                         onClick={() => window.location.href = '/store/checkout'}
//                         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     >
//                         Return to Checkout
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProcessingPage;

import React, { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";

const ProcessingPage = () => {
    const [error, setError] = useState('');
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const reference = urlParams.get('reference');
        const trxref = urlParams.get('trxref');
        
        if (!reference && !trxref) {
            setError('Invalid payment reference');
            console.log('Invalid payment reference')
            return;
        }

        let timeoutId;
        let attempts = 0;
        const maxAttempts = 10;

        const checkPaymentStatus = async () => {
            try {
                const response = await fetch(`/api/orders/${reference || trxref}`);
                const data = await response.json();

                if (data.paystackStatus === "success" && data.paymentStatus === 'completed') {
                  console.log('success, ProcessingPage')
                    window.location.href = '/store/checkout?success=1';
                } else if (data.paystackStatus === "failed") {
                  console.log('failed, ProcessingPage')
                    window.location.href = '/store/checkout?failed=1';
                } else {
                    attempts++;
                    if (attempts < maxAttempts) {
                        timeoutId = setTimeout(checkPaymentStatus, 5000);
                    } else {
                        setError('Payment verification timeout');
                        console.log('Payment verification timeout')
                        setTimeout(() => {
                            window.location.href = '/store/checkout';
                        }, 3000);
                    }
                }
            } catch (error) {
                console.error('Error checking payment status:', error);
                setError('Failed to verify payment status');
                console.log('Failed to verify payment status');
                setTimeout(() => {
                    window.location.href = '/store/checkout';
                }, 3000);
            }
        };

        checkPaymentStatus();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {!error ? (
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Processing Your Payment</h2>
                    <p className="text-gray-600">Please wait while we verify your payment...</p>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.href = '/store/checkout'}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Return to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProcessingPage;