import api from "./api";

class WishListService {
  addToWishlist = async (userId: string, productId: string) => {
    const { data } = await api.post("wishlist/add-to-wishlist", {
      userId,
      productId,
    });
    return data;
  };
  removeFromWishlist = async (userId: string, productId: string) => {
    const { data } = await api.post("wishlist/remove-from-wishlist", {
      userId,
      productId,
    });
    return data;
  };
  getWishlist = async (userId: string) => {
    const { data } = await api.post("wishlist/get-wishlist", { userId });

    return data.data;
  };
}
export const wishlistService = new WishListService();
