"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, MapPin } from "lucide-react";
import { useLocationStore } from "@/store/useLocationStore";
import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { pincode, resetPincode } = useLocationStore();
  const { getItemCount, setCartOpen } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = mounted ? getItemCount() : 0;
  const displayLocation = mounted && pincode ? pincode : "Set Location";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1E3A8A] text-white shadow-md pt-safe">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-32 h-8">
            <Image 
              src="/icons/header-logo.png" 
              alt="VRK Mart Logo" 
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Center: Location Chip */}
        <button 
          onClick={resetPincode}
          className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full text-xs font-medium max-w-[120px]"
        >
          <MapPin size={14} className="text-[#F59E0B]" />
          <span className="truncate">{displayLocation}</span>
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link href="/search" className="p-1" aria-label="Search products">
            <Search size={24} />
          </Link>
          <button 
            className="p-1 relative"
            onClick={() => setCartOpen(true)}
            aria-label="Open shopping cart"
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#10B981] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1E3A8A]">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
