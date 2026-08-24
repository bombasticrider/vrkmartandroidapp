import React from 'react';
import { BulkProductUploader } from '@/components/admin/BulkProductUploader';
import { Plus } from 'lucide-react';

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
        <button className="bg-[#10B981] text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 flex items-center">
          <Plus className="w-5 h-5 mr-1" /> Add Product
        </button>
      </div>

      <BulkProductUploader />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-gray-900">Product List</h2>
          {/* Add search and filters here */}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Brand</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Category</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-right font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Mock Row */}
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">Aashirvaad Atta</td>
                <td className="px-6 py-4">ITC</td>
                <td className="px-6 py-4 text-gray-500">Grocery</td>
                <td className="px-6 py-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
