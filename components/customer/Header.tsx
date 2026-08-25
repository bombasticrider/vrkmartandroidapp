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

  // Format header display label
  let displayLocation = 'Set Location';
  if (mounted && pincode) {
    if (areaName && areaName !== 'Outside Bengaluru' && areaName !== 'Bengaluru') {
      displayLocation = `${areaName} (${pincode})`;
    } else {
      displayLocation = isBengaluru ? `Bengaluru (${pincode})` : pincode;
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1E3A8A] text-white shadow-md pt-safe">
      <div className="flex items-center justify-between px-4 h-16 max-w-6xl mx-auto">
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

        {/* Center: Interactive Location Chip */}
        <button
          onClick={openModal}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 transition-all px-3.5 py-1.5 rounded-full text-xs font-semibold max-w-[170px] sm:max-w-[240px] border border-white/10 cursor-pointer shadow-inner"
        >
          <MapPin size={14} className="text-[#F59E0B] shrink-0" />
          <span className="truncate">{displayLocation}</span>
          <ChevronDown size={12} className="text-white/60 shrink-0" />
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/search"
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Search products"
          >
            <Search size={22} />
          </Link>
          <button
            className="p-1.5 relative hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            onClick={() => setCartOpen(true)}
            aria-label="Open shopping cart"
          >
            <ShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#10B981] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1E3A8A] shadow">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
