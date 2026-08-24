import React from 'react';
import { MetricCard } from '@/components/admin/MetricCard';
import { Users, ShoppingCart, Clock, IndianRupee } from 'lucide-react';
// import { createServerClient } from '@supabase/ssr' // Assume standard Supabase setup

export default async function AdminDashboardPage() {
  // In a real app, fetch these securely via Supabase server client
  const metrics = {
    totalMembers: 1250,
    todaysOrders: 45,
    pendingOrders: 12,
    monthlyRevenue: 250000
  };

  const recentOrders = [
    { id: '1', orderNumber: 'ORD-1001', memberName: 'John Doe', total: 1200, status: 'PENDING', date: new Date().toISOString() },
    { id: '2', orderNumber: 'ORD-1002', memberName: 'Jane Smith', total: 850, status: 'PENDING', date: new Date().toISOString() },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Active Members" value={metrics.totalMembers} icon={Users} color="bg-blue-500" />
        <MetricCard title="Today's Orders" value={metrics.todaysOrders} icon={ShoppingCart} color="bg-green-500" />
        <MetricCard title="Pending Orders" value={metrics.pendingOrders} icon={Clock} color="bg-yellow-500" />
        <MetricCard title="Monthly Revenue" value={`₹${metrics.monthlyRevenue.toLocaleString()}`} icon={IndianRupee} color="bg-purple-500" />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Recent Pending Orders</h2>
          <button className="text-[#1E3A8A] text-sm font-medium hover:underline">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Order #</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Customer</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Total</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 font-medium text-[#1E3A8A]">{order.orderNumber}</td>
                  <td className="px-6 py-4">{order.memberName}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">No pending orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
