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

      <div className="p-2.5 flex flex-col flex-grow justify-between">
        <div>
          {/* Product Name */}
          <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 mb-1 min-h-[32px] leading-tight">
            {product.name}
          </h3>

          {/* Pack Size / Variant Selector */}
          <div className="mb-1.5">
            {product.variants.length > 1 ? (
              <div className="relative">
                <select
                  value={selectedPackSize}
                  onChange={(e) => setSelectedPackSize(e.target.value)}
                  className="w-full text-[11px] font-medium bg-gray-50 border border-gray-200 rounded-md py-1 px-1.5 pr-4 text-gray-700 appearance-none focus:outline-none focus:border-[#1E3A8A] cursor-pointer"
                >
                  {product.variants.map((v) => (
                    <option key={v.pack_size} value={v.pack_size}>
                      {v.pack_size} — {formatCurrency(v.price)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-400 text-[9px]">
                  ▼
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-gray-500 font-medium py-0.5">
                {selectedVariant.pack_size}
              </div>
            )}
          </div>
        </div>

        {/* Price Section: Today Market Price + Add Stepper */}
        <div className="pt-1.5 mt-auto border-t border-gray-100 flex items-center justify-between gap-1.5">
          <div className="flex flex-col min-w-0">
            <span className="text-[8px] sm:text-[9px] text-[#1E3A8A] font-black uppercase tracking-tight leading-tight bg-blue-50 px-1 py-0.5 rounded border border-blue-100/80 truncate">
              TODAY'S RATE
            </span>
          </div>

          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="bg-emerald-50 text-[#10B981] border border-[#10B981] hover:bg-[#10B981] hover:text-white transition-all px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wide cursor-pointer shadow-xs active:scale-95 shrink-0"
            >
              + ADD
            </button>
          ) : (
            <div className="flex items-center bg-[#10B981] text-white rounded-lg h-7 overflow-hidden shadow-xs shrink-0">
              <button
                onClick={handleDecrement}
                className="w-6 h-full flex items-center justify-center font-bold text-xs hover:bg-black/10 transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-5 text-center text-xs font-bold">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-6 h-full flex items-center justify-center font-bold text-xs hover:bg-black/10 transition-colors"
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
