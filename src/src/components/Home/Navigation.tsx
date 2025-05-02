"use client"; //use as a client compnent

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useAppSelector } from "../../../hooks/useAppStore";
import { authService } from "@/lib/api/authService";
import { useDispatch } from "react-redux";
import { setUserLogout } from "@/src/store/slices/authSlice";

const navigationItems = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "NEW STORY", href: "/new" },
  { label: "SERVICES", href: "/services" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
  { label: "ORDERS", href: "/orders" },
  // { label: "LOGIN", href: "/auth" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("isLogin", isLoggedIn);

  const handleLoginLogout = (e: any) => {
    e.preventDefault();

    if (isLoggedIn) {
      dispatch(setUserLogout());
      authService.logout();
      // navigate("/login");
    }
    navigate("/login");
    // else {
    //   navigate("/login");
    // }
  };
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#EAE6E0] z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-serif">
            LOCOMINA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm tracking-wider hover:text-gray-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handleLoginLogout}>
              {isLoggedIn ? "LOGOUT" : "LOGIN"}
            </button>

            {isLoggedIn && (
              <div className="flex items-center">
                <Link to="/wishlist" className="p-2" aria-label="Wishlist">
                  <Heart className="w-5 h-5" />
                </Link>
                <Link to="/cart" className="p-2" aria-label="Cart">
                  <ShoppingCart strokeWidth={2.75} className="w-5 h-5" />
                </Link>
              </div>
            )}

            <button className="p-2" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block py-2 text-sm tracking-wider hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
