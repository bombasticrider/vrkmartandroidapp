'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useLocationStore } from '@/store/useLocationStore';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getDeliveryFee, getTotal } = useCartStore();
  const { isBengaluru } = useLocationStore();

  const subtotal = getSubtotal();
  const delivery = getDeliveryFee();
  const total = getTotal();

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#1E3A8A]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 max-w-sm">Looks like you haven&apos;t added any items to your grocery cart yet.</p>
        <Link href="/" className="bg-[#1E3A8A] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-colors shadow-md">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={`${item.productId}-${item.packSize}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-3">
            <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0 relative overflow-hidden flex items-center justify-center">
              {item.imageUrl ? (
                <Image 
                  src={item.imageUrl} 
                  alt={item.productName} 
                  fill
                  className="object-contain p-1 mix-blend-multiply"
                />
              ) : (
                <ShoppingBag className="w-6 h-6 text-gray-300" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{item.productName}</h3>
              <p className="text-xs text-gray-500">{item.packSize}</p>
              <p className="font-bold text-[#1E3A8A] mt-1">{formatCurrency(item.price)}</p>
            </div>

            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
              <button 
                onClick={() => {
                  if (item.quantity === 1) removeItem(item.productId, item.packSize);
                  else updateQuantity(item.productId, item.packSize, item.quantity - 1);
                }} 
                className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Decrease quantity"
              >
                {item.quantity === 1 ? <Trash2 className="w-4 h-4 text-red-500" /> : <Minus className="w-4 h-4" />}
              </button>
              <span className="font-bold text-sm w-5 text-center text-gray-900">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.productId, item.packSize, item.quantity + 1)} 
                className="p-1.5 text-[#10B981] hover:bg-green-50 rounded transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-3">
        <h3 className="font-bold text-gray-900 mb-2">Bill Details</h3>
        <div className="flex justify-between text-gray-600 text-sm">
          <span>Item Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm">
          <span>Delivery Fee</span>
          <span>{delivery === 0 ? <span className="text-[#10B981] font-semibold">FREE (Orders &gt; ₹500)</span> : formatCurrency(delivery)}</span>
        </div>
        <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-lg text-gray-900">
          <span>To Pay</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {!isBengaluru && (
        <div className="p-3 bg-[#F59E0B]/15 border border-[#F59E0B]/30 rounded-xl text-[#B45309] text-xs">
          ⚠️ <strong>View-Only Mode:</strong> Checkout is disabled for non-Bengaluru delivery addresses.
        </div>
      )}

      <Link 
        href={isBengaluru ? "/checkout" : "#"} 
        className={`w-full flex items-center justify-center gap-2 text-center py-4 rounded-xl font-bold text-lg transition-colors shadow-md ${
          isBengaluru 
            ? 'bg-[#10B981] hover:bg-emerald-600 text-white cursor-pointer' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
        }`}
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
