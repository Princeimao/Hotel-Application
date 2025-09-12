// import { CheckCircle, CreditCard, Lock, Shield } from "lucide-react";
// import React, { useState } from "react";

import { createPayment } from "@/api/payment";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// const BookingPayment = () => {
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [processing, setProcessing] = useState(false);
//   const [cardDetails, setCardDetails] = useState({
//     number: "",
//     expiry: "",
//     cvv: "",
//     name: "",
//   });

//   const handlePayment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setProcessing(true);

//     // Simulate payment processing
//     await new Promise((resolve) => setTimeout(resolve, 3000));

//     setProcessing(false);
//   };

//   const formatCardNumber = (value: string) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
//     const matches = v.match(/\d{4,16}/g);
//     const match = (matches && matches[0]) || "";
//     const parts = [];
//     for (let i = 0, len = match.length; i < len; i += 4) {
//       parts.push(match.substring(i, i + 4));
//     }
//     if (parts.length) {
//       return parts.join(" ");
//     } else {
//       return v;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Complete your booking
//           </h1>
//           <p className="text-gray-600">
//             Your information is protected with bank-level security
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Payment Form */}
//           <div className="space-y-6">
//             {/* Payment Method Selection */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Payment Method
//               </h3>
//               <div className="space-y-3">
//                 <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="card"
//                     checked={paymentMethod === "card"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="text-blue-600"
//                   />
//                   <CreditCard className="w-5 h-5 text-gray-600" />
//                   <span className="font-medium">Credit or Debit Card</span>
//                 </label>

//                 <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="paypal"
//                     checked={paymentMethod === "paypal"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="text-blue-600"
//                   />
//                   <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
//                     <span className="text-white text-xs font-bold">P</span>
//                   </div>
//                   <span className="font-medium">PayPal</span>
//                 </label>
//               </div>
//             </div>

//             {/* Card Details Form */}
//             {paymentMethod === "card" && (
//               <form
//                 onSubmit={handlePayment}
//                 className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
//               >
//                 <div className="flex items-center space-x-2 mb-6">
//                   <Shield className="w-5 h-5 text-green-500" />
//                   <span className="text-sm text-gray-600">
//                     Your payment information is secure and encrypted
//                   </span>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Card Number
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="1234 5678 9012 3456"
//                       value={cardDetails.number}
//                       onChange={(e) =>
//                         setCardDetails({
//                           ...cardDetails,
//                           number: formatCardNumber(e.target.value),
//                         })
//                       }
//                       maxLength={19}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Expiry Date
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="MM/YY"
//                         value={cardDetails.expiry}
//                         onChange={(e) =>
//                           setCardDetails({
//                             ...cardDetails,
//                             expiry: e.target.value,
//                           })
//                         }
//                         maxLength={5}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         CVV
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="123"
//                         value={cardDetails.cvv}
//                         onChange={(e) =>
//                           setCardDetails({
//                             ...cardDetails,
//                             cvv: e.target.value,
//                           })
//                         }
//                         maxLength={4}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Cardholder Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="John Doe"
//                       value={cardDetails.name}
//                       onChange={(e) =>
//                         setCardDetails({
//                           ...cardDetails,
//                           name: e.target.value,
//                         })
//                       }
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={processing}
//                   className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//                 >
//                   {processing ? (
//                     <div className="flex items-center space-x-2">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       <span>Processing...</span>
//                     </div>
//                   ) : (
//                     <>
//                       <Lock className="w-5 h-5" />
//                       <span>Pay ${finalTotal}</span>
//                     </>
//                   )}
//                 </button>
//               </form>
//             )}

//             {paymentMethod === "paypal" && (
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//                 <p className="text-gray-600 mb-4">
//                   You will be redirected to PayPal to complete your payment.
//                 </p>
//                 <button
//                   onClick={handlePayment}
//                   disabled={processing}
//                   className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {processing ? "Redirecting..." : "Continue with PayPal"}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Order Summary */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit sticky top-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-6">
//               Order Summary
//             </h3>

//             <div className="space-y-4">
//               {cart.map((item) => (
//                 <div key={item.roomId} className="flex space-x-3">
//                   <img
//                     src={item.room.images[0]}
//                     alt={item.room.title}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <div className="flex-1">
//                     <h4 className="font-medium text-gray-900 text-sm">
//                       {item.room.title}
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       {item.nights} nights
//                     </p>
//                     <p className="text-sm font-medium text-gray-900">
//                       ${item.totalPrice}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t mt-6 pt-6 space-y-3">
//               <div className="flex justify-between text-gray-600">
//                 <span>Subtotal</span>
//                 <span>${subtotal}</span>
//               </div>

//               <div className="flex justify-between text-gray-600">
//                 <span>Cleaning fee</span>
//                 <span>${cleaningFee}</span>
//               </div>

//               <div className="flex justify-between text-gray-600">
//                 <span>Service fee</span>
//                 <span>${serviceFee}</span>
//               </div>

//               <div className="flex justify-between text-gray-600">
//                 <span>Taxes</span>
//                 <span>${taxes}</span>
//               </div>

//               {appliedCoupon && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Discount ({appliedCoupon.code})</span>
//                   <span>-${discount}</span>
//                 </div>
//               )}

//               <div className="border-t pt-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-xl font-bold text-gray-900">Total</span>
//                   <span className="text-xl font-bold text-gray-900">
//                     ${finalTotal}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 p-4 bg-blue-50 rounded-xl">
//               <div className="flex items-start space-x-3">
//                 <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
//                 <div className="text-sm text-blue-800">
//                   <p className="font-medium mb-1">Free cancellation</p>
//                   <p>Cancel before check-in for a full refund</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPayment;

declare global {
  interface Window {
    PhonePeCheckout: any;
  }
}

const BookingPayment = () => {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);

    try {
      const res = await createPayment(600);

      // Open PayPage inside your app (IFRAME)
      window.PhonePeCheckout.transact({
        tokenUrl: res.redirectUrl,
        type: "IFRAME",
        callback: (response: string) => {
          console.log("PhonePe response:", response);

          if (response === "USER_CANCEL") {
            alert("Payment Cancelled by User");
          } else if (response === "CONCLUDED") {
            alert("Payment Completed");
          }
        },
      });
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={startPayment} disabled={loading}>
        {loading ? "Processing..." : "Pay with PhonePe"}
      </Button>
    </div>
  );
};

export default BookingPayment;
