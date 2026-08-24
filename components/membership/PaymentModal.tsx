'use client';

import React, { useState, useEffect } from 'react';
import { X, QrCode, CheckCircle2, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  merchantOrderId: string;
  onPaymentComplete: () => void;
  onClose: () => void;
}

export default function PaymentModal({ merchantOrderId, onPaymentComplete, onClose }: PaymentModalProps) {
  const [status, setStatus] = useState<'pending' | 'processing' | 'success'>('pending');

  // Simulated polling logic
  useEffect(() => {
    if (status === 'processing') {
      const timer = setTimeout(() => {
        setStatus('success');
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (status === 'success') {
      const timer = setTimeout(() => {
        onPaymentComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, onPaymentComplete]);

  const handlePaidClick = () => {
    setStatus('processing');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transition-all duration-200">
        
        {/* Header */}
        <div className="bg-[#1E3A8A] p-4 text-white flex justify-between items-center">
          <h3 className="font-semibold text-lg">Complete Membership Payment</h3>
          {status === 'pending' && (
            <button onClick={onClose} className="text-blue-100 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center">
          
          {status === 'pending' && (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-500 mb-1">Total Amount Due</p>
                <div className="text-4xl font-bold text-gray-900">₹1,000</div>
                <p className="text-xs text-gray-400 mt-2">Order ID: {merchantOrderId}</p>
              </div>

              {/* Mock QR */}
              <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300 mb-6 flex flex-col items-center">
                <QrCode className="w-48 h-48 text-gray-800" />
                <p className="mt-4 text-sm font-medium text-gray-600 text-center">
                  Scan QR code or pay via any UPI app
                </p>
              </div>

              <div className="w-full bg-blue-50 text-[#1E3A8A] text-sm p-3 rounded-lg text-center font-mono mb-6 border border-blue-100">
                UPI ID: vrkmart@ybl
              </div>

              <button 
                onClick={handlePaidClick}
                className="w-full bg-[#10B981] text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-md"
              >
                I have paid
              </button>
            </>
          )}

          {status === 'processing' && (
            <div className="py-12 flex flex-col items-center text-center">
              <Loader2 className="w-16 h-16 text-[#1E3A8A] animate-spin mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Verifying Payment...</h4>
              <p className="text-gray-500">Please wait while we confirm your transaction.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-[#10B981]" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h4>
              <p className="text-gray-500">Welcome to the VRK Mart family.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
