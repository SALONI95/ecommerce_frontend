import { ProductCard } from "../components/Products/ProductCard";
import { productService } from "@/lib/api/productService";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useParams } from "react-router-dom";

export function Products() {
  const { categoryId } = useParams();
  const [data, isFetching] = useInfiniteScroll(fetchProducts);

  async function fetchProducts(page: number, onComplete: any) {
    return await productService
      .getProductByPageNo(page, 6, categoryId)
      .then((res) => {
        onComplete(res.data.data);
        return res.data.data;
      });
  }
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
            {data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            {isFetching && <p> Fetching...... </p>}
          </div>
        </div>
      </section>
    </>
  );
}
