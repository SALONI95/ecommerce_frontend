"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative w-full h-[600px] bg-gray-50">
      <img src="src/assets/hero2.jpg" />
      {/* <Image
        src="/placeholder.svg?height=600&width=1200"
        alt="Blooming Summer Collection"
        width={1200}
        height={600}
        className="w-full h-full object-cover"
        priority
      /> */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-5xl font-light tracking-wider text-gray-800 mb-2">
          BLOOMING SUMMER
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Browse our PRE - SUMMER 2016 COLLECTION
        </p>
        <Button variant="outline" className="bg-white hover:bg-gray-50">
          Discover Collection
        </Button>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
