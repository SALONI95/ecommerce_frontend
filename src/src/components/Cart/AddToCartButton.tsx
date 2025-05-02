import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppStore";
import { cartService } from "@/lib/api/cartService";

export function AddToCartButton(props: any) {
  const productId = props.productId;

  const authState = useAppSelector((state) => state.auth);
  const userId = authState.user?._id;

  const addToCart = async (e: any) => {
    e.preventDefault();
    const { data } = await cartService.addToCart(userId, productId);
    console.log(data);
  };
  return (
    <Button
      onClick={addToCart}
      className="flex-1 bg-black text-white hover:bg-gray-800"
    >
      Add to Cart
    </Button>
  );
}
