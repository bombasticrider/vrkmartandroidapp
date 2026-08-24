'use client';
import React from 'react';
import Link from 'next/link';

export default function MembershipSuccessPage({ searchParams }: { searchParams: { vrkId?: string } }) {
  const vrkId = searchParams.vrkId || 'VRK-00000001';

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center border border-gray-100">
        
        <div className="bg-gradient-to-br from-[#F59E0B] to-yellow-400 p-8 text-white relative">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-2xl font-extrabold mb-1">Welcome to VRK Mart!</h2>
          <p className="text-yellow-100 font-medium">Your Membership is Active</p>
        </div>

        <div className="p-8">
          <p className="text-sm text-gray-500 mb-2">Your Lifetime VRK ID</p>
          <div className="bg-blue-50 border-2 border-dashed border-[#1E3A8A] rounded-xl py-4 mb-8">
            <span className="text-3xl font-black text-[#1E3A8A] tracking-wider">{vrkId}</span>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors">
              Download Membership Card
            </button>
            <Link href="/" className="w-full block bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
              Start Shopping Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
