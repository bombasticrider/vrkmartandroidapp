'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ShieldCheck, ArrowRight, TrendingUp, Coffee } from 'lucide-react';
import ProductCard, { ProductCardProduct } from '@/components/customer/ProductCard';
import VariantModal from '@/components/customer/VariantModal';
import { ALL_PRODUCTS } from '@/lib/productsData';

// Visual Categories Configuration with Custom Images and Pastel Tints
const VISUAL_CATEGORY_SECTIONS = [
  {
    title: 'Grocery & Kitchen',
    categories: [
      {
        name: 'Atta, Rice & Dal',
        slug: 'grocery',
        image: '/images/categories/aata-rice-dal.avif',
        bg: 'bg-[#FEF6E9]',
        border: 'border-[#FDE7C4]',
      },
      {
        name: 'Oil, Ghee & Masala',
        slug: 'grocery',
        image: '/images/categories/masala-oils.avif',
        bg: 'bg-[#FFFBEB]',
        border: 'border-[#FEF08A]',
      },
      {
        name: 'Dairy, Bread & Eggs',
        slug: 'dairy',
        image: '/images/categories/dairy-bread-eggs.avif',
        bg: 'bg-[#EDF5FF]',
        border: 'border-[#BFDBFE]',
      },
      {
        name: 'Vegetables & Fruits',
        slug: 'fruits-veg',
        image: '/images/categories/vegetables-fruits.jpg',
        bg: 'bg-[#E8F8F0]',
        border: 'border-[#A7F3D0]',
      },
    ],
  },
  {
    title: 'Snacks & Drinks',
    categories: [
      {
        name: 'Chips & Namkeen',
        slug: 'packaged-food',
        image: '/images/categories/chips-namkeen.jpg',
        bg: 'bg-[#FFF4ED]',
        border: 'border-[#FED7AA]',
      },
      {
        name: 'Biscuits & Bakery',
        slug: 'packaged-food',
        image: '/images/categories/asset_Biscuits_&_bakery.jpg',
        bg: 'bg-[#FAF5EE]',
        border: 'border-[#E7E0D8]',
      },
      {
        name: 'Drinks & Juices',
        slug: 'packaged-food',
        image: '/images/categories/colddrinks-juices.avif',
        bg: 'bg-[#E6F8F6]',
        border: 'border-[#99F6E4]',
      },
      {
        name: 'Instant Food',
        slug: 'packaged-food',
        image: '/images/categories/breakfast-instant-food.avif',
        bg: 'bg-[#FFF0F0]',
        border: 'border-[#FECACA]',
      },
    ],
  },
  {
    title: 'Household & Personal Care',
    categories: [
      {
        name: 'Bath & Body',
        slug: 'bath-body',
        image: '/images/categories/asset_Bath_&_Body.jpg',
        bg: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
      },
      {
        name: 'Cleaning & Home Care',
        slug: 'home-care',
        image: '/images/categories/cleaning-products.avif',
        bg: 'bg-[#EFF6FF]',
        border: 'border-[#BFDBFE]',
      },
      {
        name: 'Sweets & Treats',
        slug: 'packaged-food',
        image: '/images/categories/asset_Sweets_&_chocolates.jpg',
        bg: 'bg-[#FAF5FF]',
        border: 'border-[#E9D5FF]',
      },
      {
        name: 'Health & Wellness',
        slug: 'wellness',
        image: '/images/categories/category-wellness.svg',
        bg: 'bg-[#ECFDF5]',
        border: 'border-[#A7F3D0]',
      },
    ],
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
    <div className="space-y-7 py-4 px-4 max-w-4xl mx-auto">
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

      {/* Visual Category Sections (Blinkit & Zepto 4-Column Grid Style) */}
      <div className="space-y-6">
        {VISUAL_CATEGORY_SECTIONS.map((section) => (
          <section key={section.title} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                {section.title}
              </h2>
              <Link
                href="/categories"
                className="text-xs font-bold text-[#1E3A8A] hover:underline flex items-center gap-1"
              >
                <span>See All</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 4-Column Pastel Grid */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
              {section.categories.map((cat) => (
                <Link
                  key={`${section.title}-${cat.name}`}
                  href={`/category/${cat.slug}`}
                  className="flex flex-col items-center group active:scale-95 transition-transform"
                >
                  {/* Pastel Rounded Card */}
                  <div
                    className={`w-full aspect-square rounded-2xl sm:rounded-3xl ${cat.bg} border ${cat.border} flex items-center justify-center p-2 sm:p-3 shadow-xs group-hover:shadow-md group-hover:scale-105 transition-all overflow-hidden relative`}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-2 mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* 2-Line Bold Category Name */}
                  <span className="text-[11px] sm:text-xs font-bold text-gray-800 text-center mt-1.5 line-clamp-2 leading-tight group-hover:text-[#1E3A8A] transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

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
