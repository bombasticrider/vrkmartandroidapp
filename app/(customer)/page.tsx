'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ShieldCheck, ArrowRight, TrendingUp, Coffee } from 'lucide-react';
import ProductCard, { ProductCardProduct } from '@/components/customer/ProductCard';
import VariantModal from '@/components/customer/VariantModal';
import { ALL_PRODUCTS } from '@/lib/productsData';

// Blinkit-style All Category Tiles with official .avif images and soft blue background
const ALL_CATEGORY_TILES = [
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
    name: 'Sweet Tooth',
    slug: 'packaged-food',
    image: '/images/categories/asset_Sweets_&_chocolates.jpg',
  },
  {
    name: 'Bakery & Biscuits',
    slug: 'packaged-food',
    image: '/images/categories/asset_Biscuits_&_bakery.jpg',
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
    name: 'Personal Care',
    slug: 'personal-care',
    image: '/images/categories/asset_Bath_&_Body.jpg',
  },
];

export default function HomePage() {
  const [activeModalProduct, setActiveModalProduct] = useState<ProductCardProduct | null>(null);

  // Curated showcase collections
  const stapleGroceries = ALL_PRODUCTS.filter((p) => p.category_slug === 'grocery').slice(0, 8);
  const snacksBeverages = ALL_PRODUCTS.filter(
    (p) => p.category_slug === 'packaged-food' || p.category_slug === 'wellness'
  ).slice(0, 8);
  const homeAndCare = ALL_PRODUCTS.filter((p) =>
    ['home-care', 'personal-care', 'oral-care', 'hair-care', 'bath-body'].includes(p.category_slug)
  ).slice(0, 8);

  return (
    <div className="space-y-7 py-4 px-4 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-[#1E3A8A] via-[#162d6e] to-[#1E3A8A] text-white p-6 sm:p-8 shadow-lg">
        <div className="max-w-md space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#F59E0B] text-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <Sparkles size={14} /> Bengaluru Metro Grocery
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            100% Genuine Daily Groceries at Today&apos;s Market Price
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm">
            Free doorstep delivery across Bengaluru. Billed at daily mandi rates.
          </p>
          <div className="pt-2">
            <Link
              href="/membership/register"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all shadow-md"
            >
              <ShieldCheck size={16} /> Lifetime Membership @ ₹1,000
            </Link>
          </div>
        </div>

        {/* Ambient watermark */}
        <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none select-none text-8xl font-black">
          VRK
        </div>
      </div>

      {/* Visual Category Grid (Exact Blinkit Layout & Styling) */}
      <section className="space-y-3 bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
            Explore All Categories
          </h2>
          <Link
            href="/categories"
            className="text-xs font-bold text-[#1E3A8A] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Responsive Grid: 4 cols on mobile, 6 on tablet, 8 to 10 on desktop */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-3 sm:gap-4 pt-1">
          {ALL_CATEGORY_TILES.map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center group active:scale-95 transition-transform"
            >
              {/* Soft Sky Blue Container (Blinkit Signature Style) */}
              <div className="w-full aspect-square rounded-2xl bg-[#EBF4FF] border border-[#DCEBFE] flex items-center justify-center p-2 shadow-xs group-hover:shadow-md group-hover:scale-105 group-hover:bg-[#E1EFFF] transition-all overflow-hidden relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Centered Clean 2-Line Category Name */}
              <span className="text-[11px] sm:text-xs font-bold text-gray-800 text-center mt-2 line-clamp-2 leading-snug group-hover:text-[#1E3A8A] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 1: Popular Grocery Staples */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#10B981]" />
            <span>Popular Grocery Staples</span>
          </h2>
          <Link
            href="/category/grocery"
            className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1"
          >
            <span>See All ({ALL_PRODUCTS.filter((p) => p.category_slug === 'grocery').length})</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {stapleGroceries.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onVariantClick={(p) => setActiveModalProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* Section 2: Snacks, Biscuits & Beverages */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Coffee size={20} className="text-[#F59E0B]" />
            <span>Snacks, Biscuits & Beverages</span>
          </h2>
          <Link
            href="/category/packaged-food"
            className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {snacksBeverages.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onVariantClick={(p) => setActiveModalProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* Section 3: Home & Personal Care */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles size={20} className="text-[#1E3A8A]" />
            <span>Cleaning & Personal Care</span>
          </h2>
          <Link
            href="/category/home-care"
            className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {homeAndCare.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onVariantClick={(p) => setActiveModalProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* Bottom Sheet Variant Modal if triggered */}
      {activeModalProduct && (
        <VariantModal
          product={activeModalProduct}
          isOpen={!!activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}
    </div>
  );
}
