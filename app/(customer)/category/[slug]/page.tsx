'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import ProductCard, { ProductCardProduct } from '@/components/customer/ProductCard';
import VariantModal from '@/components/customer/VariantModal';
import { getProductsByCategory, CATEGORIES } from '@/lib/productsData';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductCardProduct | null>(null);

  const slug = params.slug.toLowerCase();
  const matchedCategory = CATEGORIES.find(c => c.slug === slug);
  const categoryTitle = matchedCategory?.name || (slug.charAt(0).toUpperCase() + slug.slice(1));
  
  // Fetch real products from dataset
  const products = getProductsByCategory(slug);

  // Extract unique subcategories for filter chips
  const subCategories = ['All', ...Array.from(new Set(products.map(p => p.category || ''))).filter(Boolean)];

  const filteredProducts = products.filter(
    p => selectedFilter === 'All' || p.category === selectedFilter
  );

  return (
    <div className="py-4 px-4 max-w-4xl mx-auto space-y-5">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Link href="/categories" className="p-2 bg-white rounded-full text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{categoryTitle}</h1>
            <p className="text-xs text-gray-500">{products.length} products available at today&apos;s market price</p>
          </div>
        </div>

        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] bg-blue-50 px-3 py-1.5 rounded-full">
          <SlidersHorizontal size={14} /> Filter
        </button>
      </div>

      {/* Dynamic Subcategory Filter Chips */}
      {subCategories.length > 2 && (
        <div className="flex overflow-x-auto space-x-2 pb-1 scrollbar-none">
          {subCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p className="font-semibold text-gray-700">No products found in this section</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onVariantClick={(prod) => setActiveModalProduct(prod)}
            />
          ))}
        </div>
      )}

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
