// import { cartService } from "@/lib/api/cartService";
// import conf from "@/lib/config/conf";

// export function RenderRazorpay({
//   orderId:string,
//   keyId:string,
//   keySecret:string,
//   currency:string,
//   amount:number,
// }) {
//   const options = {
//     key: keyId,
//     amount: data.amount,
//     currency: "INR",
//     name: conf.COMPANY_NAME,
//     description: "Test Transaction",
//     order_id: orderId,
//     handler: async function (response: any) {
//       const verifyRes = await cartService.verifyPayment({
//         order_id: orderId,
//         payment_id: response.razorpay_payment_id,
//         signature: response.razorpay_signature,
//       });

//       if (verifyRes.data.success) alert("Payment Successful!");
//       else alert("Payment Verification Failed");
//     },
//     prefill: {
//       name: "John Doe",
//       email: "john@example.com",
//       contact: "9999999999",
//     },
//     theme: { color: "#3399cc" },
//   };

//   const paymentObject = new (window as any).Razorpay(options);
//   paymentObject.open();
// }
