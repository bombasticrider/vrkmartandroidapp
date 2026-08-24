'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders/create', { method: 'POST', body: JSON.stringify({}) });
      if (res.ok) {
        router.push('/orders?new=true');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-[#1E3A8A] mb-8 text-center">Secure Checkout</h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">1. Enter Mobile Number</h2>
            <input 
              type="tel" 
              maxLength={10}
              placeholder="10-digit mobile number" 
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            />
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-[#1E3A8A] text-white py-3 rounded-xl font-bold"
            >
              Get OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">2. Verify OTP</h2>
            <p className="text-sm text-gray-500">Sent to {mobile}</p>
            <div className="flex gap-2 justify-center">
              {[1,2,3,4,5,6].map((i) => (
                <input key={i} type="text" maxLength={1} className="w-12 h-12 text-center text-xl border rounded-lg focus:ring-2 focus:ring-[#1E3A8A] outline-none" />
              ))}
            </div>
            <button 
              onClick={() => setStep(3)}
              className="w-full bg-[#1E3A8A] text-white py-3 rounded-xl font-bold mt-4"
            >
              Verify & Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">3. Confirm Order</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Delivery Address</h3>
              <p className="text-sm text-gray-600">123, Sample Street, Koramangala, Bengaluru - 560034</p>
            </div>
            
            <button 
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-[#10B981] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-70"
            >
              {loading ? 'Processing...' : 'Place Order (₹500)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
