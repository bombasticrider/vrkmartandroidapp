'use client';

import React, { useState } from 'react';
import { Search, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/customer/ProductCard';
import { ALL_PRODUCTS } from '@/lib/productsData';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filtered = ALL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(query.toLowerCase()) ||
    (p.brand || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="py-4 px-4 max-w-4xl mx-auto space-y-4">
      {/* Search Input */}
      <div className="relative flex items-center">
        <Link href="/" className="mr-3 text-gray-500 hover:text-[#1E3A8A]">
          <ArrowLeft size={22} />
        </Link>
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dals, toor dal, basmati rice, atta, oil, ghee, spices..."
            autoFocus
            className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1E3A8A] focus:outline-none text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Results / Suggestions */}
      {query.trim() === '' ? (
        <div className="py-8 text-center text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-2 opacity-30 text-[#1E3A8A]" />
          <p className="text-sm font-medium text-gray-500">Type above to search genuine DMart staple groceries</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Toor Dal', 'Aashirvaad Atta', 'Basmati Rice', 'Sunflower Oil', 'Amul Ghee', 'Turmeric Haldi', 'Sugar', 'Almonds'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="bg-white border border-gray-200 text-xs px-3 py-1.5 rounded-full text-gray-600 hover:border-[#1E3A8A] hover:text-[#1E3A8A] cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p className="font-semibold text-gray-700">No grocery products found for &ldquo;{query}&rdquo;</p>
          <p className="text-xs text-gray-400 mt-1">Try checking for typos or searching a broader term like &quot;Dal&quot; or &quot;Rice&quot;.</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-gray-500">{filtered.length} products found at standard MRP</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
