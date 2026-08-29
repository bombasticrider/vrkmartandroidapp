"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";
import { ProductCardProduct, ProductVariant } from "@/components/customer/ProductCard";


interface VariantModalProps {
  product: ProductCardProduct | null
  isOpen: boolean
  onClose: () => void
}


export default function VariantModal({ product, isOpen, onClose }: VariantModalProps) {
  const [selectedPackSize, setSelectedPackSize] = useState<string>('')
  const { addItem } = useCartStore()

  useEffect(() => {
    if (product?.variants?.length) {
      setSelectedPackSize(product.variants[0].pack_size)
    }
  }, [product])

  if (!product) return null

  const handleAddToCart = () => {
    const variant = product.variants.find(v => v.pack_size === selectedPackSize)
    if (!variant) return

    addItem({
      productId: product.id,
      productName: product.name,
      packSize: variant.pack_size,
      price: variant.price,
      quantity: 1,
      imageUrl: product.image_url,
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[100]"
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-[101] pb-safe max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-lg text-gray-900">Select Variant</h3>
              <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-full bg-gray-50">
                <X size={20} />
              </button>
            </div>

            {/* Product Info Minimal */}
            <div className="p-4 flex gap-3 items-center border-b border-gray-50">
              <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden relative flex-shrink-0">
                <img src={product.image_url || "/placeholder.png"} alt={product.name} className="w-full h-full object-contain p-1 mix-blend-multiply" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
              </div>
            </div>

            {/* Variants List */}
            <div className="overflow-y-auto p-4 flex-1">
              <div className="space-y-3">
                {product.variants.map((variant) => {
                  const isSelected = selectedPackSize === variant.pack_size
                  return (
                    <label
                      key={variant.pack_size}
                      onClick={() => setSelectedPackSize(variant.pack_size)}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                        isSelected ? 'border-[#1E3A8A] bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#1E3A8A]' : 'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#1E3A8A] rounded-full" />}
                        </div>
                        <span className="font-medium text-gray-900">{variant.pack_size}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-[#1E3A8A] font-black uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100/80">
                          TODAY MARKET PRICE
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#1E3A8A] text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-900 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
