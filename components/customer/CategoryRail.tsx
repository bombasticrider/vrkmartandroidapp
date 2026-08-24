"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon_url: string;
}

interface CategoryRailProps {
  categories: Category[];
}

export default function CategoryRail({ categories }: CategoryRailProps) {
  const pathname = usePathname();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 bg-white">
      <div className="flex gap-4 px-4 snap-x snap-mandatory min-w-max">
        {categories.map((category) => {
          const isActive = pathname === `/category/${category.slug}`;
          
          return (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`}
              className="snap-start flex flex-col items-center gap-2 w-[72px]"
            >
              <div 
                className={`w-[72px] h-[72px] rounded-2xl bg-[#F8FAFC] flex items-center justify-center p-2 transition-all ${
                  isActive ? "border-2 border-[#1E3A8A] bg-blue-50/50" : "border border-gray-100"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={category.icon_url || "/placeholder.png"} 
                    alt={category.name}
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
              </div>
              <span 
                className={`text-[10px] text-center w-full truncate px-1 ${
                  isActive ? "text-[#1E3A8A] font-semibold" : "text-gray-600 font-medium"
                }`}
              >
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
