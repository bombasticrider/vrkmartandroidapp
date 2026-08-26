'use client';

import React, { useState, useEffect } from 'react';
import { OrderCard } from '@/components/admin/OrderCard';
import { RefreshCw } from 'lucide-react';

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const tabs = ['All', 'Placed', 'Delivered', 'Cancelled'];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    // Optimistic update
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));

    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const filteredOrders =
    activeTab === 'All'
      ? orders
      : orders.filter((o) => o.status?.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex space-x-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab
                ? 'border-[#1E3A8A] text-[#1E3A8A]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-400">Loading orders from Supabase...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} onStatusUpdate={handleStatusUpdate} />
          ))}
          {filteredOrders.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No orders found in "{activeTab}" category.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
