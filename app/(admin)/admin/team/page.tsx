'use client';

import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Shield,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCw,
  Loader2,
  X,
  UserCheck,
  Package,
  ShoppingCart,
} from 'lucide-react';
import { StaffRole, StaffUser } from '@/lib/rbac';

export default function TeamManagementPage() {
  const [staffList, setStaffList] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<StaffRole>('SALES');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/staff');
      const data = await res.json();
      if (data.success && Array.isArray(data.staff)) {
        setStaffList(data.staff);
      }
    } catch (err) {
      console.error('Failed to fetch staff list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = mobile.replace(/\D/g, '').trim();

    if (cleanMobile.length !== 10) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }
    if (!name.trim()) {
      setError('Please enter staff name.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/admin/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          mobile: cleanMobile,
          email: email.trim() || null,
          role,
          is_active: true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`✅ Granted ${role} access to ${name}!`);
        setName('');
        setMobile('');
        setEmail('');
        setModalOpen(false);
        fetchStaff();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setError(data.error || 'Failed to save staff member.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (staff: StaffUser) => {
    if (staff.mobile === '8008445388') return; // Cannot deactivate permanent super admin

    const updatedStatus = !staff.is_active;
    // Optimistic update
    setStaffList(
      staffList.map((s) => (s.mobile === staff.mobile ? { ...s, is_active: updatedStatus } : s))
    );

    try {
      await fetch('/api/admin/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...staff,
          is_active: updatedStatus,
        }),
      });
    } catch (err) {
      fetchStaff();
    }
  };

  const handleDelete = async (staffMobile: string) => {
    if (staffMobile === '8008445388') {
      alert('Permanent Super Admin cannot be deleted.');
      return;
    }

    if (!confirm('Are you sure you want to revoke and delete this staff member?')) return;

    try {
      await fetch(`/api/admin/staff?mobile=${staffMobile}`, { method: 'DELETE' });
      fetchStaff();
    } catch (err) {
      console.error('Delete staff error:', err);
    }
  };

  const getRoleBadge = (r: StaffRole) => {
    switch (r) {
      case 'SUPER_ADMIN':
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-2.5 py-0.5 rounded-full">👑 Super Admin</span>;
      case 'ADMIN':
        return <span className="bg-blue-100 text-[#1E3A8A] border border-blue-300 text-xs font-bold px-2.5 py-0.5 rounded-full">🛡️ Admin</span>;
      case 'SALES':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full">💼 Sales Executive</span>;
      case 'CATEGORY_MANAGER':
        return <span className="bg-purple-100 text-purple-800 border border-purple-300 text-xs font-bold px-2.5 py-0.5 rounded-full">📦 Category Manager</span>;
      case 'DELIVERY':
        return <span className="bg-cyan-100 text-cyan-800 border border-cyan-300 text-xs font-bold px-2.5 py-0.5 rounded-full">🛵 Delivery Partner</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Team &amp; Staff Access (RBAC)</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage operations roles, invite staff via mobile OTP, and control tab permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchStaff}
            className="p-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => {
              setModalOpen(true);
              setError('');
            }}
            className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-900 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Team Member</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Role Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
            <UserCheck className="w-4 h-4" /> Sales Role
          </div>
          <p className="text-[11px] text-gray-500">Access: Shoppers CRM &amp; Members ₹12k loyalty spend.</p>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 mb-1">
            <Package className="w-4 h-4" /> Category Role
          </div>
          <p className="text-[11px] text-gray-500">Access: Products catalog &amp; Bulk Excel upload engine.</p>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 mb-1">
            <ShoppingCart className="w-4 h-4" /> Delivery Role
          </div>
          <p className="text-[11px] text-gray-500">Access: Orders queue, Bill OCR scanner &amp; UPI QR.</p>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 mb-1">
            <Shield className="w-4 h-4" /> Super Admin
          </div>
          <p className="text-[11px] text-gray-500">Permanent Owner Access (8008445388).</p>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">Active Staff Directory ({staffList.length})</h2>
          <span className="text-xs text-gray-500 font-medium">Auto-synced with Supabase</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading team permissions...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-xs">
              <thead className="bg-gray-50/80 font-bold text-gray-700">
                <tr>
                  <th className="px-5 py-3 text-left">Staff Name</th>
                  <th className="px-5 py-3 text-left">Login Mobile</th>
                  <th className="px-5 py-3 text-left">Assigned Role</th>
                  <th className="px-5 py-3 text-left">Allowed Tabs</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {staffList.map((staff) => (
                  <tr key={staff.mobile} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-gray-900">
                      {staff.name}
                      {staff.email && <span className="block text-[11px] font-normal text-gray-400">{staff.email}</span>}
                    </td>
                    <td className="px-5 py-3.5 font-mono font-bold text-gray-700 flex items-center gap-1.5 mt-1">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {staff.mobile}
                    </td>
                    <td className="px-5 py-3.5">{getRoleBadge(staff.role)}</td>
                    <td className="px-5 py-3.5 text-gray-600">
                      {staff.role === 'SUPER_ADMIN' || staff.role === 'ADMIN' ? (
                        <span className="bg-blue-50 text-[#1E3A8A] font-bold px-2 py-0.5 rounded text-[11px]">All 6 Tabs</span>
                      ) : staff.role === 'SALES' ? (
                        <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">Shoppers + Members</span>
                      ) : staff.role === 'CATEGORY_MANAGER' ? (
                        <span className="bg-purple-50 text-purple-800 font-bold px-2 py-0.5 rounded text-[11px]">Products Tab Only</span>
                      ) : (
                        <span className="bg-cyan-50 text-cyan-800 font-bold px-2 py-0.5 rounded text-[11px]">Orders &amp; Bill Scanner</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        onClick={() => handleToggleStatus(staff)}
                        disabled={staff.mobile === '8008445388'}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full transition-all ${
                          staff.is_active
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {staff.is_active ? <CheckCircle className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3" />}
                        <span>{staff.is_active ? 'Active' : 'Disabled'}</span>
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {staff.mobile !== '8008445388' && (
                        <button
                          onClick={() => handleDelete(staff.mobile)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete staff member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── ADD STAFF MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[100] animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#1E3A8A]" />
                <h3 className="text-base font-black text-gray-900">Grant Staff Access</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full bg-gray-50"
              >
                <X size={18} />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Staff Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E3A8A] font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">10-Digit Mobile (For OTP Login) *</label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E3A8A] font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@vrkmart.in"
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Select Access Role *</label>
                <div className="space-y-2">
                  <label
                    onClick={() => setRole('SALES')}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      role === 'SALES' ? 'border-[#1E3A8A] bg-blue-50/40' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-900">💼 Sales Executive</p>
                      <p className="text-[11px] text-gray-500">Only Shoppers CRM &amp; Members ₹12k loyalty spend.</p>
                    </div>
                    <input type="radio" checked={role === 'SALES'} readOnly />
                  </label>

                  <label
                    onClick={() => setRole('CATEGORY_MANAGER')}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      role === 'CATEGORY_MANAGER' ? 'border-[#1E3A8A] bg-blue-50/40' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-900">📦 Category Manager</p>
                      <p className="text-[11px] text-gray-500">Only Products catalog &amp; Bulk Excel uploader.</p>
                    </div>
                    <input type="radio" checked={role === 'CATEGORY_MANAGER'} readOnly />
                  </label>

                  <label
                    onClick={() => setRole('DELIVERY')}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      role === 'DELIVERY' ? 'border-[#1E3A8A] bg-blue-50/40' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-900">🛵 Delivery Partner</p>
                      <p className="text-[11px] text-gray-500">Orders queue, Bill OCR scan &amp; UPI QR collection.</p>
                    </div>
                    <input type="radio" checked={role === 'DELIVERY'} readOnly />
                  </label>

                  <label
                    onClick={() => setRole('ADMIN')}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      role === 'ADMIN' ? 'border-[#1E3A8A] bg-blue-50/40' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-900">🛡️ Co-Admin</p>
                      <p className="text-[11px] text-gray-500">Full operations access across all tabs.</p>
                    </div>
                    <input type="radio" checked={role === 'ADMIN'} readOnly />
                  </label>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#1E3A8A] hover:bg-blue-900 text-white py-3 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Grant Access</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
