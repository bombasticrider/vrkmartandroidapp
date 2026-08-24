'use client';
import React, { useState } from 'react';
import { Package, RefreshCw } from 'lucide-react';
import { StatusBadge } from '@/components/admin/StatusBadge';

export default function OrdersPage() {
  // Mock Data
  const [orders] = useState([
    {
      id: '1',
      orderNumber: 'ORD-54321',
      date: new Date().toISOString(),
      items: [
        { name: 'Premium Rice 5kg', quantity: 1 },
        { name: 'Toor Dal 1kg', quantity: 2 }
      ],
      total: 690,
      status: 'DELIVERED'
    },
    {
      id: '2',
      orderNumber: 'ORD-54388',
      date: new Date().toISOString(),
      items: [
        { name: 'Sunflower Oil 1L', quantity: 1 }
      ],
      total: 210,
      status: 'PLACED'
    }
  ]);

  return (
    <div className="py-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500">Start shopping to see your orders here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4 border-b pb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{order.orderNumber}</h3>
                  <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              
              <ul className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm text-gray-700">
                    <span>{item.quantity}x {item.name}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="font-bold text-lg">Total: ₹{order.total}</span>
                <button className="flex items-center text-[#1E3A8A] font-medium bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                  <RefreshCw className="w-4 h-4 mr-2" /> Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
