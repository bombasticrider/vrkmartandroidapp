'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, RefreshCw, ShoppingBag, ArrowRight, Clock, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import PhoneAuthModal from '@/components/auth/PhoneAuthModal';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [reorderSuccess, setReorderSuccess] = useState<string | null>(null);

  const { mobile, isVerified, memberName } = useAuthStore();
  const { addItem } = useCartStore();
  const router = useRouter();

  const fetchOrders = async () => {
    if (!mobile) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/orders?mobile=${mobile}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Error loading real orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVerified && mobile) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [isVerified, mobile]);

  const handleReorder = (order: any) => {
    if (!order.items || order.items.length === 0) return;

    order.items.forEach((item: any) => {
      addItem({
        productId: item.product_id || `reorder-${Date.now()}`,
        productName: item.product_name,
        packSize: item.pack_size,
        price: Number(item.price),
        quantity: Number(item.quantity) || 1,
      });
    });

    setReorderSuccess(`Items from #${order.order_number || 'order'} added to cart!`);
    setTimeout(() => {
      router.push('/cart');
    }, 800);
  };

  // State 1: Not Logged In
  if (!isVerified || !mobile) {
    return (
      <div className="py-16 px-4 max-w-md mx-auto text-center space-y-5">
        <div className="w-20 h-20 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Package className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E3A8A]">Track & Reorder</h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Sign in with your mobile number to view your past orders, delivery tracking, and 1-tap reordering.
          </p>
        </div>
        <button
          onClick={() => setShowAuthModal(true)}
          className="w-full bg-[#1E3A8A] hover:bg-blue-900 active:scale-95 text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          Sign In with Mobile OTP
        </button>

        <PhoneAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={fetchOrders}
        />
      </div>
    );
  }

  // State 2: Loading
  if (loading) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <div className="w-8 h-8 border-3 border-[#1E3A8A] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-500 font-medium">Fetching your orders...</p>
      </div>
    );
  }

  // State 3: Logged In, but No Orders Placed Yet
  if (orders.length === 0) {
    return (
      <div className="py-16 px-4 max-w-md mx-auto text-center space-y-6">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">No Orders Yet</h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-xs mx-auto">
            You haven't placed any grocery orders yet. Explore our genuine daily essentials and place your first order with free doorstep delivery!
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // State 4: Real Orders List
  return (
    <div className="py-6 max-w-2xl mx-auto space-y-5 px-4 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E3A8A]">My Orders</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
          </p>
        </div>
        <Link
          href="/"
          className="text-xs font-bold text-[#1E3A8A] bg-blue-50 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-colors"
        >
          + New Order
        </Link>
      </div>

      {reorderSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{reorderSuccess} Redirecting to cart...</span>
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-3.5">
              <div>
                <span className="text-xs font-black text-[#1E3A8A] tracking-wide">
                  {order.order_number || `ORD-${order.id.slice(0, 8).toUpperCase()}`}
                </span>
                <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(order.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <StatusBadge status={order.status || 'PLACED'} />
            </div>

            {/* Items */}
            <div className="space-y-2">
              {(order.items || []).map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-800">
                    {item.quantity}&times; {item.product_name}
                    {item.pack_size && (
                      <span className="text-gray-400 font-normal ml-1">({item.pack_size})</span>
                    )}
                  </span>
                  <span className="text-[10px] font-bold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded">
                    MARKET PRICE
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery address snippet if available */}
            {order.delivery_address?.line && (
              <div className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-xl flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{order.delivery_address.line}, Bengaluru</span>
              </div>
            )}

            {/* Footer & Reorder CTA */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                  Payment Mode
                </span>
                <span className="font-extrabold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                  💵 Pay on Delivery
                </span>
              </div>

              <button
                onClick={() => handleReorder(order)}
                className="inline-flex items-center gap-1.5 bg-[#1E3A8A] hover:bg-blue-900 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>1-Tap Reorder</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
