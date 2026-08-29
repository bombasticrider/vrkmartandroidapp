'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Search, MapPin, ChevronDown, ShoppingBag, X } from 'lucide-react';
import ProductCard, { ProductCardProduct } from '@/components/customer/ProductCard';
import VariantModal from '@/components/customer/VariantModal';
import { getProductsByCategory, CATEGORIES } from '@/lib/productsData';
import { useLocationStore } from '@/store/useLocationStore';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductCardProduct | null>(null);

  const { pincode, areaName, openModal } = useLocationStore();

  const slug = params.slug.toLowerCase();
  const matchedCategory = CATEGORIES.find((c) => c.slug === slug);
  const categoryTitle =
    matchedCategory?.name || slug.charAt(0).toUpperCase() + slug.slice(1);

  // Fetch all products for this master category
  const allCategoryProducts = useMemo(() => {
    return getProductsByCategory(slug);
  }, [slug]);

  // Extract unique subcategories & representative thumbnail for each
  const subCategoryList = useMemo(() => {
    const rawSubCats = Array.from(
      new Set(allCategoryProducts.map((p) => p.category || 'General'))
    ).filter(Boolean);

    return rawSubCats.map((subCat) => {
      // Find the first product in this subcategory to use its image as the icon
      const representativeProduct = allCategoryProducts.find(
        (p) => p.category === subCat && p.image_url
      );
      return {
        name: subCat,
        iconUrl: representativeProduct?.image_url || matchedCategory?.icon || '/icons/app-icon.png',
        count: allCategoryProducts.filter((p) => p.category === subCat).length,
      };
    });
  }, [allCategoryProducts, matchedCategory]);

  // Set default active subcategory on load if available
  const activeSubCategory =
    selectedSubCategory === 'All' && subCategoryList.length > 0
      ? subCategoryList[0].name
      : selectedSubCategory;

  // Filter products by active subcategory and in-category search query
  const filteredProducts = useMemo(() => {
    return allCategoryProducts.filter((p) => {
      const matchesSubCategory =
        activeSubCategory === 'All' || p.category === activeSubCategory;

      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSubCategory && matchesSearch;
    });
  }, [allCategoryProducts, activeSubCategory, searchQuery]);

  // Format delivery location label
  const locationLabel = areaName
    ? `${areaName}, ${pincode || '560011'}`
    : `Bengaluru, Karnataka ${pincode || '560011'}`;

  return (
    <div className="flex flex-col h-[calc(100vh-64px-64px)] overflow-hidden bg-white">
      {/* 1. TOP HEADER & IN-CATEGORY SEARCH */}
      <div className="bg-white border-b border-gray-100 px-3 py-2 shrink-0 space-y-2">
        {/* Top Row: Back + Location Dropdown */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/categories"
              className="p-1.5 -ml-1 text-gray-700 hover:bg-gray-100 rounded-full transition-colors shrink-0"
              aria-label="Back to categories"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <button
              onClick={openModal}
              className="flex items-center gap-1 text-left truncate group cursor-pointer"
            >
              <MapPin size={13} className="text-[#1E3A8A] shrink-0" />
              <span className="text-xs font-bold text-gray-800 truncate group-hover:text-[#1E3A8A] transition-colors">
                {locationLabel}
              </span>
              <ChevronDown size={12} className="text-gray-400 shrink-0" />
            </button>
          </div>

          <span className="text-[11px] font-bold text-[#1E3A8A] bg-blue-50 px-2.5 py-0.5 rounded-full shrink-0">
            {categoryTitle}
          </span>
        </div>

        {/* Search Input inside category */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search in ${categoryTitle}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E3A8A] focus:bg-white transition-all text-gray-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* 2. SPLIT VIEW: LEFT RAIL + RIGHT PRODUCT GRID */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SUBCATEGORY RAIL */}
        {subCategoryList.length > 1 && (
          <aside className="w-20 sm:w-24 bg-[#F8FAFC] border-r border-gray-200 overflow-y-auto shrink-0 scrollbar-none py-1">
            {subCategoryList.map((sub) => {
              const isActive = activeSubCategory === sub.name;
              return (
                <button
                  key={sub.name}
                  onClick={() => {
                    setSelectedSubCategory(sub.name);
                    setSearchQuery(''); // clear in-cat search on tab switch
                  }}
                  className={`w-full flex flex-col items-center text-center py-3 px-1.5 transition-all relative cursor-pointer border-b border-gray-100/60 ${
                    isActive
                      ? 'bg-white font-bold text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:bg-white/50 font-medium'
                  }`}
                >
                  {/* Active Indicator Bar on Right Edge */}
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#10B981] rounded-l-full" />
                  )}

                  {/* Icon Thumbnail */}
                  <div
                    className={`w-12 h-12 rounded-2xl p-1 mb-1.5 relative overflow-hidden flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-emerald-50 border border-emerald-200/80 scale-105 shadow-inner'
                        : 'bg-white border border-gray-200/70'
                    }`}
                  >
                    <Image
                      src={sub.iconUrl}
                      alt={sub.name}
                      fill
                      className="object-cover rounded-xl"
                      sizes="48px"
                    />
                  </div>

                  {/* Subcategory Label */}
                  <span className="text-[10px] leading-tight line-clamp-2 px-0.5">
                    {sub.name}
                  </span>
                </button>
              );
            })}
          </aside>
        )}

        {/* RIGHT PRODUCT GRID */}
        <section className="flex-1 overflow-y-auto p-2.5 sm:p-3.5 bg-gray-50/40">
          {/* Subcategory Header */}
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <h2 className="text-xs font-bold text-gray-800">
              {activeSubCategory}
            </h2>
            <span className="text-[10px] text-gray-500 font-medium">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center text-gray-500 space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-gray-300" />
              <p className="text-xs font-bold text-gray-700">No products found</p>
              {searchQuery && (
                <p className="text-[11px] text-gray-400">
                  No matches for &ldquo;{searchQuery}&rdquo; in {activeSubCategory}
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pb-20">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onVariantClick={(p) => setActiveModalProduct(p)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Variant Selection Modal */}
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
