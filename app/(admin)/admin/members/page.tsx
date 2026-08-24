'use client';
import React, { useState } from 'react';
import { Search, ShieldCheck } from 'lucide-react';

export default function AdminMembersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Members
  const members = [
    { id: '1', vrkId: 'VRK-000001', name: 'John Doe', mobile: '9876543210', status: 'ACTIVE', dateJoined: '2023-10-01' },
    { id: '2', vrkId: 'VRK-000002', name: 'Jane Smith', mobile: '8765432109', status: 'SUSPENDED', dateJoined: '2023-10-05' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Members Directory</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search name, mobile, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E3A8A] outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">VRK ID</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Member</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Mobile</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Joined</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-right font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 font-bold text-[#F59E0B]">{member.vrkId}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 text-gray-500">{member.mobile}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(member.dateJoined).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-[#1E3A8A] hover:text-blue-900 flex items-center justify-end w-full">
                      <ShieldCheck className="w-4 h-4 mr-1" /> View Proofs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
