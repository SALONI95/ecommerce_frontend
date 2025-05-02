// import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppStore";
import { wishlistService } from "@/lib/api/wishlistService";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export function ShowWishlist() {
  // const wishlistItems = []
  const [wishlistItems, setWishlistItem] = useState<any[]>([]);
  const authState = useAppSelector((state) => state.auth);
  const userId = authState.user?._id;
  const loading = authState.loading;

  const getWishlist = async (userId: any) => {
    const result = await wishlistService.getWishlist(userId);
    console.log(result);
    setWishlistItem(result.products);
  };
  useEffect(() => {
    if (userId) {
      getWishlist(userId);
    }
  }, [loading]);
  return (
    <div className="min-h-screen bg-[#EAE6E0]">
      <main className="container mx-auto px-4 pt-20">
        <h1 className="text-3xl font-serif mb-8">My Wishlist</h1>
        {wishlistItems.length == 0 ? (
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg"
              >
                <div className="relative w-20 h-20">
                  <img src={item.images[0]} />
                </div>
                <div className="flex-grow">
                  <h2 className="font-serif text-lg">{item.title}</h2>
                  <p className="text-gray-600">
                    ${item.new_price.toLocaleString()}
                  </p>
                </div>
                <Button variant="outline" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
// <main className="container mx-auto px-4 pt-20">
//   <h1 className="text-3xl font-serif mb-8">My Wishlist</h1>
//   {c.length === 0 ? (
//     <p>Your wishlist is empty.</p>
//   ) : (
//     <div className="space-y-6">
//       {wishlistItems.map((item) => (
//         <div
//           key={item._id}
//           className="flex items-center space-x-4 bg-white p-4 rounded-lg"
//         >
//           <div className="relative w-20 h-20">
//             {/* <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" /> */}
//           </div>
//           <div className="flex-grow">
//             {/* <h2 className="font-serif text-lg">{item.name}</h2>
//             <p className="text-gray-600">${item.price.toLocaleString()}</p> */}
//           </div>
//           <Button variant="outline" size="icon">
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//       ))}
//     </div>
//   )}
// </main>
