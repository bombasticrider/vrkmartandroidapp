'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { BulkProductUploader } from '@/components/admin/BulkProductUploader';
import { Search, SlidersHorizontal, Package, Tag, IndianRupee } from 'lucide-react';
import { ALL_PRODUCTS, CATEGORIES } from '@/lib/productsData';

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || product.category_slug === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Products Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Total active catalog: <strong className="text-gray-900">{ALL_PRODUCTS.length} products</strong>
          </p>
        </div>
      </div>

      {/* Bulk Uploader Component */}
      <BulkProductUploader />

      {/* Real-time Product Catalog Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Filters Header */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#1E3A8A]" />
            <h2 className="text-base font-bold text-gray-900">
              Live Product Catalog ({filteredProducts.length})
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, brand, tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-white border border-gray-200 rounded-xl py-2 px-3 pr-7 text-gray-700 appearance-none focus:outline-none focus:border-[#1E3A8A] cursor-pointer"
              >
                <option value="all">All Categories ({ALL_PRODUCTS.length})</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name} ({ALL_PRODUCTS.filter((p) => p.category_slug === cat.slug).length})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 text-[10px]">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Table List */}
        <div className="overflow-x-auto max-h-[600px]">
          <table className="min-w-full divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-50 sticky top-0 font-bold text-gray-700 z-10">
              <tr>
                <th className="px-5 py-3 text-left">Product</th>
                <th className="px-5 py-3 text-left">Brand</th>
                <th className="px-5 py-3 text-left">Category &amp; Subcategory</th>
                <th className="px-5 py-3 text-left">Pack Variants</th>
                <th className="px-5 py-3 text-right">Today&apos;s Rate</th>
                <th className="px-5 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                  {/* Product Info & Thumbnail */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200/70 p-1 shrink-0 relative overflow-hidden flex items-center justify-center">
                        <Image
                          src={p.image_url || '/icons/app-icon.png'}
                          alt={p.name}
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 line-clamp-1">{p.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono">ID: {p.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Brand */}
                  <td className="px-5 py-3 font-semibold text-gray-700">
                    {p.brand || 'Fresh Produce'}
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3 text-gray-600">
                    <div className="font-medium text-gray-900">{p.category || 'General'}</div>
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">
                      {p.category_slug}
                    </span>
                  </td>

                  {/* Pack Variants */}
                  <td className="px-5 py-3 text-gray-700">
                    <div className="flex flex-wrap gap-1">
                      {p.variants.map((v, vi) => (
                        <span
                          key={vi}
                          className="bg-gray-100 text-gray-800 text-[11px] px-2 py-0.5 rounded-md font-medium"
                        >
                          {v.pack_size}: ₹{v.price}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-3 text-right font-black text-emerald-700 text-sm">
                    ₹{p.variants[0]?.price || 0}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3 text-center">
                    <span className="px-2.5 py-1 inline-flex text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No products found matching &ldquo;{searchTerm}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
