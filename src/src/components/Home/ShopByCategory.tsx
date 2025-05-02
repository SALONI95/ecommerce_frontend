import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { categoryService } from "@/lib/api/categoryService";

// const categories = [
//   {
//     name: "Necklaces",
//     image: "/placeholder.svg?height=400&width=400",
//     href: "/shop/necklaces",
//   },
//   {
//     name: "Rings",
//     image: "/placeholder.svg?height=400&width=400",
//     href: "/shop/rings",
//   },
//   {
//     name: "Earrings",
//     image: "/placeholder.svg?height=400&width=400",
//     href: "/shop/earrings",
//   },
//   {
//     name: "Bracelets",
//     image: "/placeholder.svg?height=400&width=400",
//     href: "/shop/bracelets",
//   },
//   {
//     name: "Watches",
//     image: "/placeholder.svg?height=400&width=400",
//     href: "/shop/watches",
//   },
//   {
//     name: "Anklets",
//     image: "/placeholder.svg?height=400&width=400",
//     href: "/shop/anklets",
//   },
// ];

export function ShopByCategory() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);

  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getCategories = async () => {
    const result = await categoryService.getCategories();
    setCategoryList(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll(); // Initial check
    }
    return () => container?.removeEventListener("scroll", checkScroll);
  }, [scrollContainerRef]); // Added scrollContainerRef to dependencies

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">
          Shop by Category
        </h2>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
          >
            {!isLoading && (
              <div className="flex space-x-4 md:grid md:grid-cols-4 md:gap-4 md:space-x-0">
                {categoryList.map((category) => (
                  <Link
                    key={category._id}
                    to={`/products/${category._id}`}
                    className="group relative w-48 md:w-auto aspect-square flex-shrink-0 overflow-hidden rounded-lg"
                  >
                    <img
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      src={category.categoryImage || "/placeholder.svg"}
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <span className="text-white text-xl font-serif">
                        {category.categoryName}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {showLeftButton && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white md:hidden"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          {showRightButton && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white md:hidden"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
