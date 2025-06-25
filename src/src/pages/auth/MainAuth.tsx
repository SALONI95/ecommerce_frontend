"use client";

import { Outlet } from "react-router-dom";
import image from "../../../assets/hero2.jpg";

export default function AuthMain() {
  return (
    <div className="min-h-screen bg-[#EAE6E0]">
      {/* <Navigation /> */}
      <div className="container mx-auto px-4 pt-20">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-5rem)]">
          <div className="hidden md:block relative aspect-square">
            <img
              src={image}
              alt="Elegant jewelry"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
