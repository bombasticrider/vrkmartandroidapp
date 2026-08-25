'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, MapPin, ChevronDown } from 'lucide-react';
import { useLocationStore } from '@/store/useLocationStore';
import { useCartStore } from '@/store/useCartStore';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { pincode, areaName, openModal, isBengaluru } = useLocationStore();
  const { getItemCount, setCartOpen } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = mounted ? getItemCount() : 0;

  // Format header display label (compact on mobile)
  let displayLocation = 'Location';
  if (mounted && pincode) {
    if (areaName && areaName !== 'Outside Bengaluru' && areaName !== 'Bengaluru') {
      displayLocation = areaName;
    } else {
      displayLocation = isBengaluru ? pincode : pincode;
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1E3A8A] text-white shadow-md pt-safe">
      <div className="flex items-center justify-between px-3 sm:px-4 h-16 max-w-6xl mx-auto gap-2">
        {/* Left: Original Prominent Logo (Full size restored) */}
        <Link href="/" className="shrink-0 flex items-center">
          <div className="relative w-32 sm:w-36 h-8 sm:h-9">
            <Image
              src="/icons/header-logo.png"
              alt="VRK Mart Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Center: Compact Location Pill */}
        <button
          onClick={openModal}
          className="flex items-center gap-1 bg-white/10 hover:bg-white/20 active:scale-95 transition-all px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold max-w-[100px] sm:max-w-[160px] shrink min-w-0 border border-white/10 cursor-pointer shadow-inner"
        >
          <MapPin size={12} className="text-[#F59E0B] shrink-0" />
          <span className="truncate">{displayLocation}</span>
          <ChevronDown size={10} className="text-white/60 shrink-0" />
        </button>

        {/* Right: Actions */}
        <div className="shrink-0 flex items-center gap-2 sm:gap-3">
          <Link
            href="/search"
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
            aria-label="Search products"
          >
            <Search size={21} className="sm:w-[22px] sm:h-[22px]" />
          </Link>
          <button
            className="p-1.5 relative hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
            onClick={() => setCartOpen(true)}
            aria-label="Open shopping cart"
          >
            <ShoppingCart size={21} className="sm:w-[22px] sm:h-[22px]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#10B981] text-white text-[10px] font-extrabold w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#1E3A8A] shadow">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
