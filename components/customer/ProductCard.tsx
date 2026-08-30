'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { formatCurrency } from '@/lib/utils'

export interface ProductVariant {
  pack_size: string
  price: number
  mrp?: number
  sku?: string
}

export interface ProductCardProduct {
  id: string
  name: string
  category?: string
  brand?: string
  image_url?: string
  variants: ProductVariant[]
}

interface ProductCardProps {
  product: ProductCardProduct
  onVariantClick?: (product: ProductCardProduct) => void
}

export default function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedPackSize, setSelectedPackSize] = useState<string>(
    product.variants[0]?.pack_size ?? ''
  )
  const { items, addItem, removeItem, updateQuantity } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const selectedVariant = product.variants.find(v => v.pack_size === selectedPackSize)
    ?? product.variants[0]

  if (!selectedVariant) return null

  // Match by productId + packSize (the canonical cart keys)
  const cartItem = items.find(
    item => item.productId === product.id && item.packSize === selectedVariant.pack_size
  )
  // Ensure quantity is 0 during SSR to prevent React hydration mismatch
  const quantity = mounted ? (cartItem?.quantity ?? 0) : 0

  const handleAdd = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      packSize: selectedVariant.pack_size,
      price: selectedVariant.price,
      quantity: 1,
      imageUrl: product.image_url,
    })
  }

  const handleIncrement = () => {
    updateQuantity(product.id, selectedVariant.pack_size, quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity === 1) {
      removeItem(product.id, selectedVariant.pack_size)
    } else {
      updateQuantity(product.id, selectedVariant.pack_size, quantity - 1)
    }
  }

  const displayCategory = product.category || 'Grocery Essentials'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Product Image — Full bleed without padding/border */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.image_url || '/icons/app-icon.png'}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      <div className="p-3 flex flex-col flex-grow justify-between">
        <div>
          {/* Product Name — 16px Font-Normal */}
          <h3 className="text-base font-normal text-gray-900 line-clamp-2 mb-1.5 min-h-[40px] leading-snug">
            {product.name}
          </h3>

          {/* Pack Size / Variant Selector */}
          <div className="mb-2">
            {product.variants.length > 1 ? (
              <div className="relative">
                <select
                  value={selectedPackSize}
                  onChange={(e) => setSelectedPackSize(e.target.value)}
                  className="w-full text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-2 pr-5 text-gray-800 appearance-none focus:outline-none focus:border-[#1E3A8A] cursor-pointer"
                >
                  {product.variants.map((v) => (
                    <option key={v.pack_size} value={v.pack_size}>
                      {v.pack_size}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 text-[10px]">
                  ▼
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-600 font-medium py-0.5">
                {selectedVariant.pack_size}
              </div>
            )}
          </div>

          {/* Today's Market Price Pill — Placed above the Add button */}
          <div className="mb-2">
            <span className="inline-block text-[10px] text-[#1E3A8A] font-extrabold uppercase tracking-tight leading-none bg-blue-50 px-2 py-1 rounded-md border border-blue-100/80">
              TODAY&apos;S MARKET PRICE
            </span>
          </div>
        </div>

        {/* Footer: Dedicated Add Button / Stepper */}
        <div className="pt-2 mt-auto border-t border-gray-100">
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="w-full bg-emerald-50 text-[#10B981] border border-[#10B981] hover:bg-[#10B981] hover:text-white transition-all py-1.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-xs active:scale-95 text-center flex items-center justify-center gap-1"
            >
              + ADD
            </button>
          ) : (
            <div className="w-full flex items-center justify-between bg-[#10B981] text-white rounded-xl h-8 overflow-hidden shadow-xs">
              <button
                onClick={handleDecrement}
                className="w-10 h-full flex items-center justify-center font-black text-sm hover:bg-black/10 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-xs font-black">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-10 h-full flex items-center justify-center font-black text-sm hover:bg-black/10 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
