'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/useCartStore'
import { useLocationStore } from '@/store/useLocationStore'
import { formatCurrency } from '@/lib/utils'

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, items, removeItem, updateQuantity, getSubtotal, getDeliveryFee, getTotal, getItemCount } = useCartStore()
  const { isBengaluru } = useLocationStore()
  const router = useRouter()

  const subtotal = getSubtotal()
  const deliveryFee = getDeliveryFee()
  const total = getTotal()
  const itemCount = getItemCount()

  const handleCheckout = () => {
    if (!isBengaluru) {
      alert('Checkout not available in your area. View-Only Mode active.')
      return
    }
    setCartOpen(false)
    router.push('/checkout')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-[#1E3A8A]" size={24} />
                <h2 className="font-bold text-lg text-gray-900">
                  My Cart <span className="text-gray-500 text-sm font-normal">({itemCount} items)</span>
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={48} className="text-[#1E3A8A]/40" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.packSize}`}
                      className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3"
                    >
                      <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="object-contain p-1 w-full h-full mix-blend-multiply"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag size={20} className="text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                            {item.productName}
                          </h4>
                          <span className="text-xs text-gray-500 mt-0.5 block">{item.packSize}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] font-extrabold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded">
                            MARKET PRICE
                          </span>
                          <div className="flex items-center border border-gray-200 rounded-full h-7 overflow-hidden">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) removeItem(item.productId, item.packSize)
                                else updateQuantity(item.productId, item.packSize, item.quantity - 1)
                              }}
                              className="w-7 h-full flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              {item.quantity === 1 ? (
                                <Trash2 size={12} className="text-red-500" />
                              ) : (
                                '−'
                              )}
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-gray-900 bg-gray-50 h-full flex items-center justify-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.packSize, item.quantity + 1)}
                              className="w-7 h-full flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="bg-white border-t border-gray-200 p-4 pb-safe space-y-3">
                <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>Total Selected Items</span>
                    <span>{items.reduce((sum, i) => sum + i.quantity, 0)} items</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Doorstep Delivery</span>
                    <span className="text-[#10B981] font-bold">FREE (Bengaluru)</span>
                  </div>
                  <div className="pt-1 border-t border-blue-200/60 text-[11px] text-gray-500 font-medium">
                    📋 Billed at today&apos;s lowest market price upon delivery.
                  </div>
                </div>

                {!isBengaluru && (
                  <div className="p-2.5 bg-[#F59E0B]/10 rounded-lg flex gap-2 items-start text-[#B45309] text-xs">
                    <span className="shrink-0">⚠️</span>
                    <p>Checkout is disabled. We don&apos;t deliver to your pincode yet.</p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={!isBengaluru}
                  className="w-full bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white py-3.5 rounded-xl font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{isBengaluru ? 'Proceed to Checkout' : 'Checkout Unavailable'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
