import React from 'react';
import { MetricCard } from '@/components/admin/MetricCard';
import { Users, ShoppingCart, Clock, IndianRupee } from 'lucide-react';
import { createServerClient } from '@/lib/supabaseServer';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  let totalMembers = 0;
  let todaysOrders = 0;
  let pendingOrdersCount = 0;
  let totalRevenue = 0;
  let recentOrders: any[] = [];

  try {
    const supabase = createServerClient();

    // 1. Total Members count
    const { count: memberCount } = await (supabase.from('members') as any)
      .select('*', { count: 'exact', head: true });
    totalMembers = memberCount || 0;

    // 2. Orders queries
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: allOrders } = await (supabase.from('orders') as any)
      .select('id, order_number, member_name, total_amount, status, created_at')
      .order('created_at', { ascending: false });

    if (allOrders && allOrders.length > 0) {
      allOrders.forEach((o: any) => {
        const orderDate = new Date(o.created_at);
        if (orderDate >= today) {
          todaysOrders += 1;
        }
        if (o.status === 'PLACED' || o.status === 'PENDING') {
          pendingOrdersCount += 1;
        }
        totalRevenue += Number(o.total_amount) || 0;
      });

      recentOrders = allOrders.slice(0, 10);
    }
  } catch (err) {
    console.error('Admin dashboard Supabase error:', err);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total Registered" value={totalMembers} icon={Users} color="bg-blue-500" />
        <MetricCard title="Today's Orders" value={todaysOrders} icon={ShoppingCart} color="bg-green-500" />
        <MetricCard title="Pending Delivery" value={pendingOrdersCount} icon={Clock} color="bg-yellow-500" />
        <MetricCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={IndianRupee} color="bg-purple-500" />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-[#1E3A8A] text-sm font-medium hover:underline">
            View All Orders
          </Link>
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
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 font-medium text-[#1E3A8A]">
                    {order.order_number || `ORD-${order.id.slice(0, 8).toUpperCase()}`}
                  </td>
                  <td className="px-6 py-4">{order.member_name || 'Customer'}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 font-medium">₹{order.total_amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        order.status === 'DELIVERED'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'CANCELLED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status || 'PLACED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">No orders recorded in database yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
