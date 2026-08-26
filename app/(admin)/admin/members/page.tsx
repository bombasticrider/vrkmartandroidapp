'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AdminMembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleStatusToggle = async (memberId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    setMembers(members.map((m) => (m.id === memberId ? { ...m, status: newStatus } : m)));

    try {
      await fetch('/api/admin/members', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, status: newStatus }),
      });
    } catch (err) {
      console.error('Error updating member status:', err);
    }
  };

  const filteredMembers = members.filter((member) => {
    const q = searchTerm.toLowerCase();
    return (
      member.name?.toLowerCase().includes(q) ||
      member.mobile?.includes(q) ||
      member.vrkId?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members Directory</h1>
          <p className="text-xs text-gray-500">{members.length} registered customers & members</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMembers}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search name, mobile, VRK ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-400">Loading members from Supabase...</div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">VRK ID / Status</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Customer Name</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Mobile</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Joined Date</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-500">Toggle Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-[#F59E0B]">{member.vrkId}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 text-gray-500">+91 {member.mobile}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(member.dateJoined).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          member.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-medium">
                      <button
                        onClick={() => handleStatusToggle(member.id, member.status)}
                        className="text-[#1E3A8A] hover:underline"
                      >
                        {member.status === 'ACTIVE' ? 'Set Suspended' : 'Set Active'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredMembers.length === 0 && (
              <div className="text-center py-12 text-gray-500">No members found in database.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
