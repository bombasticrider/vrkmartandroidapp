'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, PhoneCall, Award, ShoppingBag, Sparkles } from 'lucide-react';

export default function WelcomeBenefitsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the welcome popup
    const hasSeen = localStorage.getItem('vrk_benefits_modal_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('vrk_benefits_modal_seen', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-amber-300/40">
        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-all shadow-lg cursor-pointer"
          aria-label="Close welcome modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Flyer Image Container */}
        <div className="overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-gray-300">
          <div className="relative w-full">
            <Image
              src="/images/promotions/vrk-official-flyer.jpg"
              alt="VRK Mart Welfare Scheme - Your Dreams We Will Fulfill"
              width={800}
              height={1200}
              priority
              className="w-full h-auto object-contain select-none"
            />
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-3.5 bg-gradient-to-t from-slate-900 via-slate-900 to-slate-800 border-t border-amber-400/30 text-white space-y-2.5 shrink-0 shadow-2xl">
          {/* Quick Dial Hotline Row */}
          <div className="flex items-center justify-between px-1 text-xs">
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Helpline:
            </span>
            <div className="flex items-center gap-3 font-mono font-extrabold text-amber-200">
              <a
                href="tel:9505934045"
                className="hover:text-white flex items-center gap-1 hover:underline"
              >
                <PhoneCall className="w-3 h-3 text-emerald-400" /> 95059 34045
              </a>
              <span>•</span>
              <a
                href="tel:8792387996"
                className="hover:text-white flex items-center gap-1 hover:underline"
              >
                <PhoneCall className="w-3 h-3 text-emerald-400" /> 87923 87996
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/membership/register"
              onClick={handleClose}
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs shadow-md transition-all active:scale-98"
            >
              <Award className="w-4 h-4 text-slate-950 shrink-0" />
              <span className="truncate">Join Member (₹1000)</span>
            </Link>

            <button
              onClick={handleClose}
              className="flex items-center justify-center gap-1.5 bg-[#10B981] hover:bg-emerald-600 text-white font-black py-2.5 px-3 rounded-xl text-xs shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="truncate">Shop Mandi Rates</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
