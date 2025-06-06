import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { wishlistService } from "@/lib/api/wishlistService";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/src/store/slices/authSlice";
import { IProducts } from "@/types/types";

import { Heart, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type WishlistButtonProps = {
  product: IProducts;
};

export function WishlistButton(props: WishlistButtonProps) {
  const product = props.product;
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authState = useAppSelector((state) => state.auth);
  const wishlist = useAppSelector((state) => state.auth.wishlist?.items);
  // const wishlist = authState.wishlist?.items;
  const userId = authState.user?._id;
  const loading = authState.loading;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loading) {
      // console.log("wishlist", wishlist);
      if (wishlist?.find((item) => item._id === product._id)) {
        setIsFavorite(true);
      }
    }
  }, [loading]);

  const handleWishlist = async () => {
    if (!userId) {
      console.log(userId);
      navigate("/login");
      return;
    }
    setIsLoading(true);
    // setOptimisticFavorite(!isFavorite);
    if (!isFavorite) {
      const res = await wishlistService.addToWishlist(userId, product._id);
      if (res?.success) {
        dispatch(addToWishlist(product));
        setIsFavorite(true);
      }
    } else {
      const res = await wishlistService.removeFromWishlist(userId, product._id);
      if (res?.success) {
        dispatch(removeFromWishlist(product._id));
        setIsFavorite(false);
      }
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <>
      <Button
        variant="outline"
        className="aspect-square p-2"
        onClick={handleWishlist}
      >
        <Heart className={isFavorite ? "fill-current text-red-500" : ""} />
      </Button>
    </>
  );
}
