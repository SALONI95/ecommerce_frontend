import { Button } from "@/components/ui/button";
import { cartService } from "@/lib/api/cartService";
import { useAppSelector } from "@/hooks/useAppStore";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function PlusMinusButton(props: any) {
  const { user } = useAppSelector((state) => state.auth);
  const productId = props.productId;
  const userId = user?._id;
  const [quantity, setQuantity] = useState<number>(props.quantity || 1);

  const updateQuantity = async (quantity: number) => {
    console.log(quantity);
    setQuantity(quantity);
    const result = await cartService.updateQuantity({
      userId,
      quantity,
      productId,
    });

    console.log(result);
  };

  const decreaseQuantity = async (e: any) => {
    e.preventDefault();
    updateQuantity(quantity === 1 ? quantity : quantity - 1);
  };
  const increaseQuantity = async (e: any) => {
    e.preventDefault();
    updateQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <Button onClick={decreaseQuantity} variant="outline" size="icon">
        <Minus className="h-4 w-4" />
      </Button>
      <span>{quantity}</span>
      <Button onClick={increaseQuantity} variant="outline" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
