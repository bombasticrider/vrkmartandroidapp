'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Dairy, Bread & Eggs',
    slug: 'dairy',
    image: '/images/categories/dairy-bread-eggs.avif',
  },
  {
    name: 'Fruits & Vegetables',
    slug: 'fruits-veg',
    image: '/images/categories/Fruits-vegetables.avif',
  },
  {
    name: 'Atta, Rice & Dal',
    slug: 'grocery',
    image: '/images/categories/aata-rice-dal.avif',
  },
  {
    name: 'Masala, Oil & More',
    slug: 'grocery',
    image: '/images/categories/masala-oils.avif',
  },
  {
    name: 'Cold Drinks & Juices',
    slug: 'packaged-food',
    image: '/images/categories/colddrinks-juices.avif',
  },
  {
    name: 'Snacks & Munchies',
    slug: 'packaged-food',
    image: '/images/categories/snacks-munchies.avif',
  },
  {
    name: 'Breakfast & Instant Food',
    slug: 'packaged-food',
    image: '/images/categories/breakfast-instant-food.avif',
  },
  {
    name: 'Tea, Coffee & Drinks',
    slug: 'wellness',
    image: '/images/categories/tea-coffee-drinks.avif',
  },
  {
    name: 'Cleaning Essentials',
    slug: 'home-care',
    image: '/images/categories/cleaning-products.avif',
  },
  {
    name: 'Chicken, Meat & Fish',
    slug: 'packaged-food',
    image: '/images/categories/meat-non-veg.avif',
  },
];

export default function CategoriesPage() {
  return (
    <div className="py-4 px-2 sm:px-4 max-w-5xl mx-auto space-y-4 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] via-[#162d6e] to-[#1E3A8A] rounded-2xl p-5 text-white shadow-md">
        <div className="inline-flex items-center gap-1.5 bg-[#F59E0B] text-black font-bold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
          <Sparkles size={12} /> All Categories
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">Explore Categories</h1>
        <p className="text-blue-100 text-xs sm:text-sm mt-1">
          Shop daily grocery staples &amp; household essentials at Today&apos;s Market Price
        </p>
      </div>

      {/* Visual Category Grid - 4 cols on mobile, 5 cols on desktop with exact aspect ratio */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-x-0 gap-y-2 sm:gap-y-3">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href={`/category/${cat.slug}`}
            className="block group active:scale-95 transition-transform"
            title={cat.name}
          >
            <div className="relative w-full aspect-[270/396] overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 180px"
                className="object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
