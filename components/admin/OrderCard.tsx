import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Package, User, Phone, CheckCircle, XCircle } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  memberName: string;
  memberMobile: string;
  items: OrderItem[];
  total: number;
  status: string;
  paymentStatus: string;
}

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Order #{order.orderNumber}</h3>
          <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <StatusBadge status={order.status} />
          <StatusBadge status={order.paymentStatus} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{order.memberName}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{order.memberMobile}</span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <Package className="w-4 h-4 mr-2" /> Items
        </h4>
        <ul className="space-y-2 text-sm">
          {order.items.map(item => (
            <li key={item.id} className="flex justify-between text-gray-700 font-medium">
              <span>{item.quantity}x {item.name}</span>
              <span className="text-xs text-[#1E3A8A] font-bold bg-blue-50 px-2 py-0.5 rounded">Market Rate</span>
            </li>
          ))}
        </ul>
        <div className="border-t mt-4 pt-4 flex justify-between items-center text-sm font-bold text-gray-900">
          <span>Billing Mode</span>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-xs">💵 Pay on Delivery</span>
        </div>
      </div>

      <div className="flex space-x-3">
        {order.status === 'PLACED' && (
          <button
            onClick={() => onStatusUpdate(order.id, 'DELIVERED')}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center transition-colors"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark Delivered & Paid
          </button>
        )}
        {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
          <button
            onClick={() => onStatusUpdate(order.id, 'CANCELLED')}
            className="flex-1 border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-50 flex items-center justify-center transition-colors"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}
