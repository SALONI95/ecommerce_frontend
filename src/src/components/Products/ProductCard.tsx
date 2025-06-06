import { useNavigate } from "react-router-dom";
import { WishlistButton } from "../Wishlist/wishlistButton";
import { AddToCartButton } from "../Cart/AddToCartButton";

export function ProductCard({ product }: any) {
  const navigate = useNavigate();

  // const [isFavorite, setIsFavorite] = useState(false);
  const handleOnClickCard = (e: any) => {
    e.preventDefault();
    navigate(`/product-details/${product._id}`);
  };

  return (
    <div className="group cursor-pointer">
      <div
        onClick={handleOnClickCard}
        className="relative aspect-square bg-[#f5f0eb] mb-4"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="m-3">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-sm line-through text-gray-600">
          ${product.old_price}
        </p>
        <p className="text-sm text-gray-600">${product.new_price}</p>
        <p className="text-sm text-gray-600">{product.type?.typeName}</p>
        <p className="text-sm text-gray-600">
          {product.category?.categoryName}
        </p>
      </div>
      <div className="flex space-x-4">
        <AddToCartButton productId={product._id} />
        {/* <Button>
          Add to Cart
        </Button> */}
        <WishlistButton product={product} />
        {/* <Button
          variant="outline"
          className="aspect-square p-2"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={isFavorite ? "fill-current text-red-500" : ""} />
        </Button> */}
      </div>
    </div>
  );
}
