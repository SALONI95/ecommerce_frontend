import { Button } from "@/components/ui/button";
import { ProductCard } from "../Products/ProductCard";
import { productService } from "@/lib/api/productService";
import { IProducts } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useAppDispatch } from "@/hooks/useAppStore";

export function Collection() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productData, setProductData] = useState<IProducts[]>([]);

  const fetchProducts = async (pageNo: number, limit: number) => {
    setIsLoading(true);
    const res = await productService.getProductByPageNo(pageNo, limit);
    setProductData(res.data.data);
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    fetchProducts(1, 3);
  }, []);

  const handleOnExploreMore = (e: any) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4">EVERYDAY JEWELRY</h2>
            <p className="text-gray-600">
              Crafted with a discerning eye for luxury
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {!isLoading &&
              productData.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            {isLoading && <p> Loading...... </p>}
          </div>
          <div className="flex flex-row items-center justify-center my-5">
            <Button
              onClick={handleOnExploreMore}
              className="bg-black text-white hover:bg-black/90 rounded-none px-8"
            >
              Explore More
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
