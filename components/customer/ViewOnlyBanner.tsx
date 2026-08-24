"use client";

import React, { useState, useEffect } from "react";
import { useLocationStore } from "@/store/useLocationStore";

export default function ViewOnlyBanner() {
  const [mounted, setMounted] = useState(false);
  const { pincode, isBengaluru, resetPincode, hasPincodeSet } = useLocationStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasPincodeSet || isBengaluru) {
    return null;
  }

  return (
    <div className="sticky top-0 z-[40] w-full bg-[#F59E0B] text-black px-4 py-2 text-sm flex items-center justify-between font-medium shadow-sm">
      <div className="flex items-center gap-2">
        <span>⚠️</span>
        <span className="truncate">View-Only Mode — Checkout disabled. We don&apos;t deliver to {pincode} yet.</span>
      </div>
      <button 
        onClick={resetPincode}
        className="text-black underline whitespace-nowrap ml-2 text-xs font-bold cursor-pointer"
      >
        Change Pincode
      </button>
    </div>
  );
}
