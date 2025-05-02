import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Search } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left section */}
          <nav className="hidden md:flex space-x-6 text-sm">
            <Link
              to="/trending-now"
              className="text-gray-600 hover:text-gray-900"
            >
              TRENDING NOW
            </Link>
            <Link
              to="/collections"
              className="text-gray-600 hover:text-gray-900"
            >
              COLLECTIONS
            </Link>
            <Link
              to="/bestsellers"
              className="text-gray-600 hover:text-gray-900"
            >
              BESTSELLERS
            </Link>
          </nav>

          {/* Center logo */}
          <div className="flex-1 text-center">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl font-light tracking-wider">
                Angel Design
                <span className="block text-sm tracking-widest">JEWELRY</span>
              </h1>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            <Link to="/search" className="text-gray-600 hover:text-gray-900">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/wishlist" className="text-gray-600 hover:text-gray-900">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
