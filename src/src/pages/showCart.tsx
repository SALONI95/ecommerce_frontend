import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppStore";
import { cartService } from "@/lib/api/cartService";
import conf from "@/lib/config/conf";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { PlusMinusButton } from "../components/Cart/PlusMinusButton";

export async function PaymentOrder(cart: any, userId: any) {
  const res = await cartService.getOrder(cart.amount);

  const options = {
    key: import.meta.env.RAZORPAY_KEY_ID,
    amount: res.amount,
    currency: "INR",
    name: conf.COMPANY_NAME,
    description: "Test Transaction",
    order_id: res.id,
    handler: async function (response: any) {
      const verifyRes = await cartService.verifyPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });
      console.log("verifyRes", verifyRes);
      if (verifyRes.data.success) {
        console.log("Payment Successful!");
        const result = cartService.createOrder({
          userId,
          amount: cart.amount,
          paymentDetails: {
            status: "processed",
            payment_order_id: response.razorpay_order_id,
          },
          items: cart.items,
          billingAddress: undefined,
          shippingAddress: undefined,
        });

        console.log(result);
      }
      //   else {
      //     console.log("Payment Verification Failed");
      // }
    },
    prefill: {
      name: "John Doe",
      email: "john@example.com",
      contact: "9999999999",
    },
    theme: { color: "#3399cc" },
  };

  const paymentObject = new (window as any).Razorpay(options);
  console.log(paymentObject.get());
  return paymentObject.open();
}
// type CartItems = {
//   product:Partial<IProducts[]>,
//   quantity:number
// }

type CartResponse = {
  amount: number;
  cartItems: any[]; //CartItems[]
};

const ShowCart = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?._id;
  const [cart, setCart] = useState<CartResponse>({
    cartItems: [],
    amount: 0,
  });
  console.log(cart);
  const [cartLoading, setCartLoading] = useState<boolean>(true);
  const handleCheckout = async (e: any) => {
    e.preventDefault();
    if (cart) {
      const result = await PaymentOrder(cart, userId);
      console.log("result", result);
    }
  };

  const removeitem = async (productId: string) => {
    const result = await cartService.removeFromCart({ userId, productId });
    if (result.success) {
      setCart({
        ...cart,
        cartItems: cart.cartItems.filter(
          (item) => item.product._id !== productId
        ),
      });
    }

    console.log(result);
  };

  const getCart = async (userId: string) => {
    const cart = await cartService.getCartList(userId);
    console.log(cart);
    setCart({ ...cart, cartItems: cart.cartItems?.items, amount: cart.amount });
    setCartLoading(false);
  };
  useEffect(() => {
    if (userId) {
      getCart(userId);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#EAE6E0]">
      <main className="container mx-auto px-4 pt-20">
        <h1 className="text-3xl font-serif mb-8">My Cart</h1>
        {cartLoading ? (
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {cart.cartItems?.length > 0 ? (
              <div className="space-y-6">
                {cart.cartItems?.map((item) => (
                  <div
                    key={item.product?._id}
                    className="flex items-center space-x-4 bg-white p-4 rounded-lg"
                  >
                    <div className="relative w-20 h-20">
                      <img src={item?.product?.images[0]} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="font-serif text-lg">
                        {item.product.title}
                      </h2>
                      <p className="text-gray-600">
                        ${item.product.new_price.toLocaleString()}
                      </p>
                      <PlusMinusButton
                        productId={item.product._id}
                        quantity={item.quantity}
                      />
                      {/* <div className="flex items-center space-x-2 mt-2">
                        <Button variant="outline" size="icon">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div> */}
                    </div>
                    <Button
                      onClick={() => removeitem(item.product._id)}
                      variant="outline"
                      size="icon"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                  <span className="font-serif text-lg">Total:</span>
                  <span className="font-serif text-lg">
                    ${cart?.amount.toLocaleString()}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Proceed to Checkout
                </Button>
              </div>
            ) : (
              <p>Cart is empty</p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ShowCart;
