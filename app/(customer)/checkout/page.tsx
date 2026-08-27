'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useLocationStore } from '@/store/useLocationStore';
import PhoneAuthModal from '@/components/auth/PhoneAuthModal';
import { ShieldCheck, Truck, ArrowRight, CheckCircle2, User, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'PAY_ON_DELIVERY' | 'UPI'>('PAY_ON_DELIVERY');
  const [addressLine, setAddressLine] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const { items, getSubtotal, getDeliveryFee, getTotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();
  const { mobile, isVerified, memberName, vrkId, isMember, address } = useAuthStore();
  const { pincode, isBengaluru } = useLocationStore();

  // Auto-populate saved address
  React.useEffect(() => {
    if (address && !addressLine) {
      setAddressLine(address);
    }
  }, [address]);



  const handlePlaceOrder = async () => {
    if (!isVerified || !mobile) {
      setShowAuthModal(true);
      return;
    }

    if (!isBengaluru) {
      alert('We currently only deliver to Bengaluru metropolitan pincodes (560xxx).');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        memberMobile: mobile,
        memberName: memberName || 'Valued Customer',
        deliveryAddress: {
          line: addressLine || 'Saved Bengaluru Address',
          city: 'Bengaluru',
          pincode: pincode || '560001',
          state: 'Karnataka',
        },
        items: items.map((i) => ({
          productId: i.productId,
          productName: i.productName,
          packSize: i.packSize,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal,
        deliveryFee,
        totalAmount: total,
        paymentMethod,
      };

      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        router.push(`/orders?new=true&orderNumber=${data.orderNumber}`);
      } else {
        setError(data.error || 'Failed to place order. Please try again.');
      }
    } catch (err: any) {
      console.error('Order placement error:', err);
      setError('Network error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-24 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-[#1E3A8A]">Review & Checkout</h1>
        <p className="text-xs text-gray-500 mt-1">100% Genuine Daily Groceries at Standard MRP</p>
      </div>

      {/* Step 1: Customer Account Status */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-[#1E3A8A]" />
            Customer Account
          </h2>
          {isVerified ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </span>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-xs font-bold text-[#1E3A8A] hover:underline"
            >
              Sign In with Mobile
            </button>
          )}
        </div>

        {isVerified ? (
          <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 text-sm">{memberName}</p>
              <p className="text-xs text-gray-500">+91 {mobile}</p>
            </div>
            {vrkId && (
              <span className="bg-[#F59E0B]/20 text-[#1E3A8A] font-extrabold text-xs px-3 py-1 rounded-lg border border-[#F59E0B]/30">
                ⭐ {vrkId}
              </span>
            )}
          </div>
        ) : (
          <div className="text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-xs text-gray-500 mb-3">Please sign in with your mobile number to complete this order</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-[#1E3A8A] hover:bg-blue-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm cursor-pointer"
            >
              Verify Mobile OTP
            </button>
          </div>
        )}
      </div>

      {/* Step 2: Delivery Address */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#1E3A8A]" />
          Bengaluru Delivery Address
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Door / Flat No, Building Name, Street"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1E3A8A]"
          />
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value="Bengaluru, Karnataka"
              className="w-1/2 bg-gray-50 px-4 py-2.5 border border-gray-200 rounded-xl text-xs text-gray-600"
            />
            <input
              type="text"
              readOnly
              value={`Pincode: ${pincode || '560001'}`}
              className="w-1/2 bg-gray-50 px-4 py-2.5 border border-gray-200 rounded-xl text-xs text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Step 3: Order Items & Pricing */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center justify-between">
          <span>Order Items ({items.length})</span>
          <Link href="/cart" className="text-xs text-[#1E3A8A] font-semibold hover:underline">
            Edit Cart
          </Link>
        </h2>

        <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
          {items.map((item) => (
            <div key={`${item.productId}-${item.packSize}`} className="py-2.5 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-gray-900">{item.productName}</p>
                <p className="text-gray-400">{item.packSize} &times; {item.quantity}</p>
              </div>
              <span className="text-[10px] font-black text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded">
                MARKET PRICE
              </span>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Total Items</span>
            <span className="font-bold text-gray-900">{items.reduce((sum, i) => sum + i.quantity, 0)} items</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Doorstep Delivery</span>
            <span className="text-emerald-600 font-bold">FREE (Bengaluru)</span>
          </div>
          <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
            <p className="font-bold text-gray-800">📋 Billed at Today&apos;s Lowest Market Price</p>
            <p className="text-[11px] text-gray-400">Final itemized receipt will be provided at doorstep delivery. Pay easily via Cash or UPI.</p>
          </div>
        </div>
      </div>

      {/* Step 4: Payment Method */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
          Payment Method
        </h2>
        <div className="p-4 rounded-2xl border-2 border-[#1E3A8A] bg-blue-50/50 text-[#1E3A8A]">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm">💵 Pay on Delivery</span>
            <span className="text-[10px] font-extrabold bg-[#10B981] text-white px-2 py-0.5 rounded-full">RECOMMENDED</span>
          </div>
          <p className="font-normal text-xs text-gray-600 mt-1">
            Pay with UPI (GPay / PhonePe / Paytm QR) or Cash when groceries are delivered to your door.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Place Order CTA */}
      <button
        onClick={handlePlaceOrder}
        disabled={loading || items.length === 0}
        className="w-full bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white py-4 rounded-2xl font-extrabold text-base shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span>Place Order (Pay on Delivery)</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Firebase Phone Auth Modal */}
      <PhoneAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
