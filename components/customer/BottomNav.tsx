"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Star, RefreshCw, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/categories", label: "Categories", icon: Grid },
    { href: "/promise", label: "VRK Promise", icon: Star, isSpecial: true },
    { href: "/orders", label: "Reorder", icon: RefreshCw },
    { href: "/profile", label: "Account", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full relative"
            >
              <Icon 
                size={item.isSpecial ? 28 : 24} 
                className={`mb-1 transition-colors ${
                  item.isSpecial 
                    ? isActive ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#F59E0B]"
                    : isActive ? "text-[#1E3A8A]" : "text-gray-400"
                }`} 
              />
              <span 
                className={`text-[10px] font-medium transition-colors ${
                  item.isSpecial
                    ? "text-[#F59E0B] font-bold"
                    : isActive ? "text-[#1E3A8A]" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
              
              {isActive && !item.isSpecial && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#1E3A8A]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
