import React from 'react';
import { User, MapPin, Package, HelpCircle, Info, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const isLoggedIn = true; // Replace with auth store logic

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <User className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Not Signed In</h2>
        <p className="text-gray-500 mb-6">Sign in to view your profile and orders.</p>
        <button className="bg-[#1E3A8A] text-white px-8 py-3 rounded-full font-bold">Sign In</button>
      </div>
    );
  }

  return (
    <div className="py-6 max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-[#1E3A8A]">
          <User className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">John Doe</h1>
          <p className="text-gray-500">+91 9876543210</p>
          <div className="mt-2 inline-flex items-center bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1 rounded-full text-sm font-bold border border-[#F59E0B]/20">
            ⭐ VRK-000102
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          <button className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors">
            <Package className="w-5 h-5 text-gray-400 mr-4" />
            <span className="flex-1 text-left font-medium text-gray-700">My Orders</span>
          </button>
          <button className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors">
            <MapPin className="w-5 h-5 text-gray-400 mr-4" />
            <span className="flex-1 text-left font-medium text-gray-700">Saved Addresses</span>
          </button>
          <button className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-400 mr-4" />
            <span className="flex-1 text-left font-medium text-gray-700">Help & Support</span>
          </button>
          <button className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors">
            <Info className="w-5 h-5 text-gray-400 mr-4" />
            <span className="flex-1 text-left font-medium text-gray-700">About VRK Mart</span>
          </button>
        </div>
      </div>

      <button className="w-full flex items-center justify-center p-4 text-red-500 font-medium bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
        <LogOut className="w-5 h-5 mr-2" />
        Log Out
      </button>
    </div>
  );
}
