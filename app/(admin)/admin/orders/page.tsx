'use client';
import React, { useState } from 'react';
import { OrderCard } from '@/components/admin/OrderCard';

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Placed', 'Delivered', 'Cancelled'];

  // Mock Orders Data
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: 'ORD-54321',
      date: new Date().toISOString(),
      memberName: 'John Doe',
      memberMobile: '9876543210',
      items: [
        { id: 'i1', name: 'Premium Rice 5kg', quantity: 1, price: 450 },
        { id: 'i2', name: 'Dal 1kg', quantity: 2, price: 120 }
      ],
      total: 690,
      status: 'PLACED',
      paymentStatus: 'PENDING'
    }
  ]);

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = activeTab === 'All' 
    ? orders 
    : orders.filter(o => o.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
      
      <div className="flex space-x-2 border-b border-gray-200">
        {tabs.map(tab => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map(order => (
          <OrderCard key={order.id} order={order} onStatusUpdate={handleStatusUpdate} />
        ))}
        {filteredOrders.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No orders found for the selected status.
          </div>
        )}
      </div>
    </div>
  );
}
