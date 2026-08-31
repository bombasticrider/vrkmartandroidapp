'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  RefreshCw,
  Award,
  Phone,
  Send,
  Target,
  Home,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminMembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ALL' | 'TARGET_MET' | 'IN_PROGRESS' | 'NEEDS_ATTENTION'>('ALL');

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/members');
      const data = await res.json();
      if (data.success && Array.isArray(data.members)) {
        setMembers(data.members);
      }
    } catch (err) {
      console.error('Error fetching admin members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((member) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      member.name?.toLowerCase().includes(q) ||
      member.mobile?.includes(q) ||
      member.vrkId?.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (activeTab === 'TARGET_MET') return member.isTargetMet;
    if (activeTab === 'IN_PROGRESS') return member.currentMonthSpend > 0 && !member.isTargetMet;
    if (activeTab === 'NEEDS_ATTENTION') return member.currentMonthSpend === 0;
    return true;
  });

  const getWhatsAppSpendReminder = (m: any) => {
    const cleanNum = m.mobile.replace(/\D/g, '');
    const currentSpendStr = formatCurrency(m.currentMonthSpend);
    const neededStr = formatCurrency(m.amountNeeded);

    const text = encodeURIComponent(
      `Namaste ${m.name || 'Member'} ji! 🙏\n\n` +
      `This is a friendly update on your VRK Co-operative Membership (${m.vrkId}):\n\n` +
      `🛒 Your Current Month Grocery Spend: ${currentSpendStr} / ₹12,000\n` +
      `🏡 Target Needed for ${m.dreamBox || '2BHK Dream Home'} Qualification: ${neededStr}\n\n` +
      `Order your family's fresh vegetables and grocery essentials before month-end to keep your active streak alive!\n\n` +
      `👉 Order now with Free Delivery: https://vrkmart.co.in`
    );
    return `https://wa.me/91${cleanNum}?text=${text}`;
  };

  const targetMetCount = members.filter((m) => m.isTargetMet).length;
  const inProgressCount = members.filter((m) => m.currentMonthSpend > 0 && !m.isTargetMet).length;
  const zeroSpendCount = members.filter((m) => m.currentMonthSpend === 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Members &amp; ₹12,000 Loyalty Tracker</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Official Co-op Shareholder registry and monthly grocery spend milestone monitor (2BHK Dream Scheme).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchMembers}
            className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] bg-blue-50 hover:bg-blue-100 px-3.5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Loyalty</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Total Members</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">{members.length}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Paid ₹1,000 Shareholders</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase">Target Met (₹12k+)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2">{targetMetCount}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Qualified this month</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 uppercase">In Progress</span>
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-[#1E3A8A] mt-2">{inProgressCount}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Active shoppers (&lt; ₹12k)</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-600 uppercase">Zero Spend</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-black text-red-600 mt-2">{zeroSpendCount}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Need reminder SMS</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        {/* Controls Row */}
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
              All Members ({members.length})
            </button>
            <button
              onClick={() => setActiveTab('TARGET_MET')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'TARGET_MET'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Target Met ({targetMetCount})
            </button>
            <button
              onClick={() => setActiveTab('IN_PROGRESS')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'IN_PROGRESS'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              In Progress ({inProgressCount})
            </button>
            <button
              onClick={() => setActiveTab('NEEDS_ATTENTION')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'NEEDS_ATTENTION'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Zero Spend ({zeroSpendCount})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, mobile, VRK ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E3A8A]"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="py-16 text-center text-gray-400">Calculating monthly loyalty streaks...</div>
        ) : (
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="min-w-full divide-y divide-gray-100 text-xs">
              <thead className="bg-gray-50/80 font-bold text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Member &amp; Goal</th>
                  <th className="px-4 py-3 text-left">VRK ID &amp; Mobile</th>
                  <th className="px-4 py-3 text-left w-56">Current Month Invoiced Spend (₹12,000 Target)</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-900">
                      {m.name}
                      <span className="flex items-center gap-1 text-[11px] font-normal text-gray-500 mt-0.5">
                        <Home className="w-3 h-3 text-amber-600 shrink-0" />
                        {m.dreamBox || '2BHK Dream Home Scheme'}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="bg-blue-50 text-[#1E3A8A] font-mono font-bold px-2 py-0.5 rounded text-[11px] block w-max">
                        {m.vrkId}
                      </span>
                      <span className="text-[11px] text-gray-600 font-mono flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {m.mobile}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-extrabold text-gray-900">
                            {formatCurrency(m.currentMonthSpend)}
                          </span>
                          <span className="text-gray-400 font-medium">/ ₹12,000</span>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              m.isTargetMet
                                ? 'bg-[#10B981]'
                                : m.currentMonthSpend > 0
                                ? 'bg-[#1E3A8A]'
                                : 'bg-gray-300'
                            }`}
                            style={{ width: `${Math.max(5, m.spendPercent)}%` }}
                          />
                        </div>

                        <div className="flex justify-between items-center text-[10px]">
                          <span className={m.isTargetMet ? 'text-emerald-700 font-bold' : 'text-gray-500'}>
                            {m.isTargetMet ? '✓ Goal Met' : `${formatCurrency(m.amountNeeded)} needed`}
                          </span>
                          <span className="font-bold text-gray-700">{m.spendPercent}%</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      {m.isTargetMet ? (
                        <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                          🟢 Active Streak
                        </span>
                      ) : m.currentMonthSpend > 0 ? (
                        <span className="bg-blue-100 text-[#1E3A8A] font-bold text-[10px] px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                          🟡 In Progress
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 font-bold text-[10px] px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                          🔴 Needs Orders
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!m.isTargetMet && (
                          <a
                            href={getWhatsAppSpendReminder(m)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                            title="Send WhatsApp spend reminder"
                          >
                            <Send className="w-3 h-3" />
                            <span>Remind</span>
                          </a>
                        )}

                        <a
                          href={`/api/membership/certificate?id=${m.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-500 hover:text-[#1E3A8A] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Download Certificate"
                        >
                          <FileText className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400 font-medium">
                      No members found matching your search.
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
