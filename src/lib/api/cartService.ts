import api from "./api";

class CartService {
  addToCart = async (userId: string, productId: string) => {
    const { data } = await api.post("cart/add-to-cart", {
      userId,
      productId,
    });
    return data;
  };
  removeFromCart = async (postObj: any) => {
    const { data } = await api.post("cart/remove-from-cart", postObj);
    return data;
  };
  getCartList = async (userId: string) => {
    const { data } = await api.post("cart/get-cartList", { userId });

    return data.data;
  };

  getOrder = async (amount: number) => {
    const { data } = await api.post("payment/get-payment", {
      amount,
    });
    return data.data;
  };

  verifyPayment = async (postObj: any) => {
    const res = await api.post("payment/verify-payment", postObj);
    return res;
  };

  createOrder = async (postObj: any) => {
    const res = await api.post("order/create-order", postObj);
    return res;
  };

  updateQuantity = async (postObj: any) => {
    const { data } = await api.post("cart/update-quantity", postObj);
    return data;
  };
}
export const cartService = new CartService();
