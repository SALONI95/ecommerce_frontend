import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { wishlistService } from "@/lib/api/wishlistService";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/src/store/slices/authSlice";
import { Heart, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function WishlistButton(props: any) {
  const productId = props.productId;
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authState = useAppSelector((state) => state.auth);
  const userId = authState.user?._id;
  const wishlist = authState.user?.wishlist?.products;
  const loading = authState.loading;
  const dispatch = useAppDispatch();
  // const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(
  //   isFavorite,
  //   (state) => !state
  // );

  useEffect(() => {
    if (!loading) {
      if (wishlist?.find((product) => product === productId)) {
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
      const res = await wishlistService.addToWishlist(userId, productId);
      if (res?.success) {
        dispatch(
          addToWishlist({
            productId,
          })
        );
        setIsFavorite(true);
      }
    } else {
      const res = await wishlistService.removeFromWishlist(userId, productId);
      if (res?.success) {
        dispatch(
          removeFromWishlist({
            productId,
          })
        );
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
