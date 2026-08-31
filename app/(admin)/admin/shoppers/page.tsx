'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Phone,
  ShoppingBag,
  Send,
  CheckCircle,
  Clock,
  RefreshCw,
  Sparkles,
  Award,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Shopper {
  mobile: string;
  name: string;
  totalOrders: number;
  totalSpent: number;
  isMember: boolean;
  vrkId?: string;
  lastActive: string;
}

export default function ShoppersCrmPage() {
  const [shoppers, setShoppers] = useState<Shopper[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'NON_MEMBERS' | 'MEMBERS' | 'LEADS'>('ALL');

  const fetchShoppers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/shoppers');
      const data = await res.json();
      if (data.success && Array.isArray(data.shoppers)) {
        setShoppers(data.shoppers);
      }
    } catch (err) {
      console.error('Failed to fetch shoppers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShoppers();
  }, []);

  // Filter logic
  const filtered = shoppers.filter((s) => {
    const matchesSearch =
      s.mobile.includes(search) || s.name.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'NON_MEMBERS') return !s.isMember && s.totalOrders > 0;
    if (activeTab === 'MEMBERS') return s.isMember;
    if (activeTab === 'LEADS') return s.totalOrders === 0 && !s.isMember;
    return true;
  });

  const totalShoppersCount = shoppers.length;
  const nonMembersCount = shoppers.filter((s) => !s.isMember).length;
  const membersCount = shoppers.filter((s) => s.isMember).length;
  const totalDeliveredRevenue = shoppers.reduce((acc, s) => acc + s.totalSpent, 0);

  const getWhatsAppPitchLink = (s: Shopper) => {
    const cleanNum = s.mobile.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Namaste ${s.name || 'Sir/Madam'}! 🙏\n\nThank you for shopping on VRK Mart. Did you know you can unlock lifetime grocery benefits and eligibility for the 2BHK Dream Home Scheme by joining as a VRK Lifetime Member for just ₹1,000?\n\n👉 Join 5,000+ families here: https://vrkmart.co.in/membership/register`
    );
    return `https://wa.me/91${cleanNum}?text=${text}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Shoppers &amp; Marketing CRM</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Track customer order history, OTP leads, and retarget shoppers to become Lifetime Members.
          </p>
        </div>

        <button
          onClick={fetchShoppers}
          className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] bg-blue-50 hover:bg-blue-100 px-3.5 py-2.5 rounded-xl transition-colors shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh CRM</span>
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Total Shoppers</span>
            <Users className="w-4 h-4 text-[#1E3A8A]" />
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">{totalShoppersCount}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Captured mobile numbers</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase">Target Leads</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2">{nonMembersCount}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Ready for ₹1,000 member pitch</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase">Paid Members</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-700 mt-2">{membersCount}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Co-op Shareholders</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 uppercase">Delivered Sales</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-[#1E3A8A] mt-2">{formatCurrency(totalDeliveredRevenue)}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Final invoiced total</p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'ALL'
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Shoppers ({shoppers.length})
            </button>
            <button
              onClick={() => setActiveTab('NON_MEMBERS')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'NON_MEMBERS'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Non-Member Buyers ({shoppers.filter((s) => !s.isMember && s.totalOrders > 0).length})
            </button>
            <button
              onClick={() => setActiveTab('LEADS')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'LEADS'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              OTP Leads (0 Orders) ({shoppers.filter((s) => s.totalOrders === 0 && !s.isMember).length})
            </button>
            <button
              onClick={() => setActiveTab('MEMBERS')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'MEMBERS'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Converted Members ({membersCount})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Mobile or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E3A8A]"
            />
          </div>
        </div>

        {/* Shoppers Table */}
        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading shoppers database...</div>
        ) : (
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="min-w-full divide-y divide-gray-100 text-xs">
              <thead className="bg-gray-50/80 font-bold text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Shopper Name</th>
                  <th className="px-4 py-3 text-left">Mobile Number</th>
                  <th className="px-4 py-3 text-center">Orders Placed</th>
                  <th className="px-4 py-3 text-right">Total Delivered</th>
                  <th className="px-4 py-3 text-center">Co-op Status</th>
                  <th className="px-4 py-3 text-right">Retargeting Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filtered.map((shopper) => (
                  <tr key={shopper.mobile} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-900">
                      {shopper.name}
                      <span className="block text-[10px] font-normal text-gray-400">
                        Last Active: {new Date(shopper.lastActive).toLocaleDateString('en-IN')}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-gray-700 flex items-center gap-1.5 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {shopper.mobile}
                    </td>
                    <td className="px-4 py-3.5 text-center font-bold text-gray-800">
                      {shopper.totalOrders} {shopper.totalOrders === 1 ? 'order' : 'orders'}
                    </td>
                    <td className="px-4 py-3.5 text-right font-black text-[#1E3A8A]">
                      {formatCurrency(shopper.totalSpent)}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {shopper.isMember ? (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-600" />
                          {shopper.vrkId || 'Lifetime Member'}
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 font-semibold text-[10px] px-2 py-0.5 rounded-full">
                          Regular Shopper
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {!shopper.isMember ? (
                        <a
                          href={getWhatsAppPitchLink(shopper)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          <span>WhatsApp Pitch</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                          ✓ Converted
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                      No shoppers match your filter or search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
