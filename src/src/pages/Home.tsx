// import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Home/Hero";
import { About } from "../components/Home/About";
import { Collection } from "../components/Home/Collection";
import { ShopByCategory } from "../components/Home/ShopByCategory";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ShopByCategory />
      <About />
      <Collection />
    </div>
  );
}
