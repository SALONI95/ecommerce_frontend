import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppStore";
import { cartService } from "@/lib/api/cartService";
import { useNavigate } from "react-router-dom";

export function AddToCartButton(props: any) {
  const productId = props.productId;
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  // const userId = authState.user?._id;

  const addToCart = async (e: any) => {
    e.preventDefault();
    if (!user?._id) {
      navigate("/login");
      return;
    }
    const { data } = await cartService.addToCart(user?._id, productId);
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
