'use client';

import React, { useState, useEffect } from 'react';
import { useLocationStore } from '@/store/useLocationStore';
import { AlertTriangle, MapPin } from 'lucide-react';

export default function ViewOnlyBanner() {
  const [mounted, setMounted] = useState(false);
  const { pincode, isBengaluru, openModal, hasPincodeSet } = useLocationStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasPincodeSet || isBengaluru) {
    return null;
  }

  return (
    <div className="sticky top-16 z-[40] w-full bg-gradient-to-r from-[#F59E0B] to-amber-500 text-amber-950 px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between font-semibold shadow-md">
      <div className="flex items-center gap-2 max-w-[80%]">
        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-900" />
        <span className="truncate">
          <strong>View-Only Mode:</strong> We currently deliver only in &amp; around Bengaluru (560xxx &amp; 562xxx). Pincode <strong>{pincode}</strong> is outside delivery area.
        </span>
      </div>
      <button
        onClick={openModal}
        className="bg-white/90 hover:bg-white text-amber-900 px-3 py-1 rounded-lg text-xs font-extrabold shadow-sm transition-all whitespace-nowrap ml-2 cursor-pointer flex items-center gap-1 shrink-0"
      >
        <MapPin className="w-3 h-3" /> Change
      </button>
    </div>
  );
}
