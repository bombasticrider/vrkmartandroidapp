'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import PhoneAuthModal from '@/components/auth/PhoneAuthModal';
import { User, MapPin, Package, HelpCircle, LogOut, ShieldCheck, ChevronRight, Star, Edit2, Check } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { isVerified, mobile, memberName, vrkId, isMember, address, setAuth, logout } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(memberName || '');
  const [editAddress, setEditAddress] = useState(address || '');
  const [saving, setSaving] = useState(false);

  if (!isVerified || !mobile) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 max-w-md mx-auto">
        <div className="w-20 h-20 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mb-5 shadow-inner">
          <User className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#1E3A8A] mb-2">Welcome to VRK Mart</h2>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          Sign in with your mobile number to view your orders, saved addresses, and Lifetime Membership benefits.
        </p>
        <button
          onClick={() => setShowAuthModal(true)}
          className="w-full bg-[#1E3A8A] hover:bg-blue-900 active:scale-95 text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          Sign In with Mobile OTP
        </button>

        <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-left w-full">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
            Lifetime Membership @ ₹1,000
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed mb-3">
            Get 7 lifetime welfare benefits and lifetime grocery benefits across Bengaluru.
          </p>
          <Link
            href="/membership/register"
            className="inline-block text-xs font-bold text-[#1E3A8A] underline"
          >
            Become a Member &rarr;
          </Link>
        </div>

        <PhoneAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    setSaving(true);
    try {
      await fetch('/api/customer/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile,
          fullName: editName.trim(),
          address: editAddress.trim(),
        }),
      });

      setAuth({
        memberName: editName.trim(),
        address: editAddress.trim() || null,
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setAuth({
        memberName: editName.trim(),
        address: editAddress.trim() || null,
      });
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="py-6 max-w-xl mx-auto space-y-5 px-4 pb-24">
      {/* Member Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-16 h-16 bg-blue-100/80 rounded-2xl flex items-center justify-center text-[#1E3A8A] font-extrabold text-xl shrink-0 shadow-inner">
            {memberName ? memberName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-extrabold text-gray-900 truncate">{memberName || 'Valued Customer'}</h1>
            <p className="text-xs text-gray-500 font-medium">+91 {mobile}</p>
            {vrkId ? (
              <div className="mt-2 inline-flex items-center gap-1.5 bg-[#F59E0B]/15 text-[#1E3A8A] px-3 py-1 rounded-lg text-xs font-black border border-[#F59E0B]/30">
                <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                {vrkId} &bull; LIFETIME MEMBER
              </div>
            ) : (
              <Link
                href="/membership/register"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200"
              >
                ⭐ Upgrade to Lifetime Member
              </Link>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            setEditName(memberName || '');
            setEditAddress(address || '');
            setIsEditing(!isEditing);
          }}
          className="p-2 text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 rounded-xl transition-colors shrink-0"
          title="Edit Profile"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      {/* Edit Profile Form Drawer */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-5 border border-blue-100 shadow-sm space-y-3 animate-in fade-in">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">Edit Your Details</h3>
          <div>
            <label className="text-[11px] font-semibold text-gray-500 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-[#1E3A8A] outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-500 block mb-1">Delivery Address</label>
            <textarea
              rows={2}
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              placeholder="Flat / House No, Apartment, Street"
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:border-[#1E3A8A] outline-none resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 bg-gray-100 text-gray-600 font-bold text-xs py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Navigation Menu */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
        <Link
          href="/orders"
          className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors"
        >
          <Package className="w-5 h-5 text-gray-400 mr-3.5" />
          <span className="flex-1 text-left font-semibold text-xs text-gray-800">My Orders</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Link>
        <Link
          href="/promise"
          className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors"
        >
          <ShieldCheck className="w-5 h-5 text-amber-500 mr-3.5" />
          <span className="flex-1 text-left font-semibold text-xs text-gray-800">⭐ VRK Promise Benefits</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Link>
        <div className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors">
          <MapPin className="w-5 h-5 text-gray-400 mr-3.5" />
          <div className="flex-1 text-left">
            <span className="font-semibold text-xs text-gray-800 block">Delivery Address</span>
            <span className="text-[11px] text-gray-400 line-clamp-1">
              {address ? `${address}, Bengaluru` : 'Bengaluru Delivery Zone (560xxx)'}
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            {address ? 'Saved' : 'Active'}
          </span>
        </div>
        <a
          href="https://wa.me/919505934045"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors"
        >
          <HelpCircle className="w-5 h-5 text-gray-400 mr-3.5" />
          <span className="flex-1 text-left font-semibold text-xs text-gray-800">WhatsApp Help & Support</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </a>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full flex items-center justify-center p-4 text-red-600 font-bold text-xs bg-red-50/80 rounded-2xl hover:bg-red-100 transition-colors cursor-pointer border border-red-100"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </button>
    </div>
  );
}
