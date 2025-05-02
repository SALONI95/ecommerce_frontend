import { productService } from "@/lib/api/productService";
import { IProducts } from "@/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddToCartButton } from "../components/Cart/AddToCartButton";
import { WishlistButton } from "../components/Wishlist/wishlistButton";

export function ProductDetails() {
  const [mainImage, setMainImage] = useState<string>();
  const [productDetails, setProductDetails] = useState<Partial<IProducts>>({});
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchProduct = async (id: any) => {
    setLoading(true);
    const product = await productService.getProduct(id);
    setProductDetails(product);
    setMainImage(product.images[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct(id);
  }, []);
  return (
    <>
      {!isLoading && (
        <main className="container mx-auto px-4 pt-20">
          <div className="grid md:grid-cols-2 gap-8 items-start py-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                <img
                  src={mainImage || "/placeholder.svg"}
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {productDetails?.images?.map((img, index) => (
                  <button
                    key={index}
                    className="relative aspect-square bg-white rounded-lg overflow-hidden"
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${productDetails.title} - Image ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-serif">
                {productDetails.title}
              </h1>
              <p className="text-gray-600">{productDetails.description}</p>
              <div className="flex items-baseline space-x-4">
                <span className="text-2xl font-semibold">
                  ${productDetails?.new_price?.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${productDetails?.old_price?.toLocaleString()}
                </span>
              </div>
              <div className="flex space-x-4">
                <AddToCartButton productId={productDetails._id} />
                <WishlistButton productId={productDetails._id} />
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold mb-2">Product Details</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>18k white gold chain and setting</li>
                  <li>1-carat brilliant-cut diamond pendant</li>
                  <li>16-inch chain with 2-inch extender</li>
                  <li>Secure lobster clasp closure</li>
                  <li>Comes in a luxury gift box</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
