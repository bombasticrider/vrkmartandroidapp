'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ShieldCheck, ArrowRight, TrendingUp, Coffee, Sparkle, HeartHandshake, SparklesIcon } from 'lucide-react';
import ProductCard, { ProductCardProduct } from '@/components/customer/ProductCard';
import VariantModal from '@/components/customer/VariantModal';
import { ALL_PRODUCTS, CATEGORIES } from '@/lib/productsData';

export default function HomePage() {
  const [activeModalProduct, setActiveModalProduct] = useState<ProductCardProduct | null>(null);

  // Curated showcase collections
  const stapleGroceries = ALL_PRODUCTS.filter(p => p.category_slug === 'grocery').slice(0, 8);
  const snacksBeverages = ALL_PRODUCTS.filter(p => p.category_slug === 'packaged-food' || p.category_slug === 'wellness').slice(0, 8);
  const homeAndCare = ALL_PRODUCTS.filter(p => ['home-care', 'personal-care', 'oral-care', 'hair-care', 'bath-body'].includes(p.category_slug)).slice(0, 8);

  return (
    <div className="space-y-7 py-4 px-4 max-w-4xl mx-auto">
      {/* Hero Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#1E3A8A] via-[#162d6e] to-[#1E3A8A] text-white p-6 sm:p-8 shadow-lg">
        <div className="max-w-md space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#F59E0B] text-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <Sparkles size={14} /> Bengaluru Metro Grocery
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            100% Genuine Daily Groceries at Standard MRP
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm">
            Free doorstep delivery on orders above ₹500 across Bengaluru.
          </p>
          <div className="pt-2">
            <Link
              href="/membership/register"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95"
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

      {/* Horizontal Category Rail */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span>Shop by Category</span>
          </h2>
          <Link href="/categories" className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none snap-x -mx-4 px-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="snap-start shrink-0 flex flex-col items-center w-20 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-3 group-hover:border-[#1E3A8A] group-hover:shadow-md transition-all">
                <Image
                  src={cat.icon}
                  alt={cat.name}
                  width={36}
                  height={36}
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-[11px] font-medium text-gray-700 text-center mt-1.5 line-clamp-1 group-hover:text-[#1E3A8A] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 1: Popular Grocery Staples */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#10B981]" />
            <span>Popular Grocery Staples</span>
          </h2>
          <Link href="/category/grocery" className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1">
            <span>See All ({ALL_PRODUCTS.filter(p => p.category_slug === 'grocery').length})</span>
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
          <Link href="/category/packaged-food" className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1">
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
          <Link href="/category/home-care" className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1">
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
