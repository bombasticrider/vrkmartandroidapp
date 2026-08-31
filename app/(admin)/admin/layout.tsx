import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  UserCheck,
  ShieldAlert,
  LogOut,
  UserCog,
} from 'lucide-react';
import { StaffRole, ROLE_PERMISSIONS } from '@/lib/rbac';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const session = cookieStore.get('vrk_admin_session');
  const role = (cookieStore.get('vrk_staff_role')?.value || 'SUPER_ADMIN') as StaffRole;
  const staffName = cookieStore.get('vrk_staff_name')?.value || 'Super Admin';
  const staffMobile = cookieStore.get('vrk_staff_mobile')?.value || '8008445388';

  // If no session (e.g. on /admin/login), render children without admin sidebar
  if (!session?.value) {
    return <>{children}</>;
  }

  // All master admin tabs
  const allTabs = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', href: '/admin/products', icon: Package },
    { id: 'orders', label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { id: 'shoppers', label: 'Shoppers (CRM)', href: '/admin/shoppers', icon: Users },
    { id: 'members', label: 'Members (Co-op)', href: '/admin/members', icon: UserCheck },
    { id: 'team', label: 'Team & Staff', href: '/admin/team', icon: UserCog },
  ];

  // Filter tabs by staff role
  const permittedTabIds = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.SUPER_ADMIN;
  const visibleNavItems = allTabs.filter((tab) => permittedTabIds.includes(tab.id));

  // Role Badge Label
  const roleLabels: Record<StaffRole, { title: string; color: string }> = {
    SUPER_ADMIN: { title: 'Super Admin', color: 'bg-amber-400/20 text-amber-300 border-amber-400/30' },
    ADMIN: { title: 'Admin', color: 'bg-blue-400/20 text-blue-200 border-blue-400/30' },
    SALES: { title: 'Sales Executive', color: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30' },
    CATEGORY_MANAGER: { title: 'Category Manager', color: 'bg-purple-400/20 text-purple-300 border-purple-400/30' },
    DELIVERY: { title: 'Delivery Partner', color: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30' },
  };

  const currentRoleInfo = roleLabels[role] || roleLabels.SUPER_ADMIN;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1E3A8A] text-white min-h-screen p-4 sticky top-0 h-screen">
        <div className="mb-6 p-2">
          <div className="w-36 h-9 relative mb-2">
            <Image
              src="/icons/header-logo.png"
              alt="VRK Mart Logo"
              fill
              className="object-contain object-left"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-blue-200 uppercase tracking-wider font-bold">Portal v2.0</p>
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${currentRoleInfo.color}`}
            >
              {currentRoleInfo.title}
            </span>
          </div>
        </div>

        {/* Dynamic Nav Items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-800 transition-colors text-sm font-semibold"
              >
                <Icon className="w-5 h-5 text-blue-300" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="pt-4 mt-auto border-t border-blue-800/80 space-y-3">
          <div className="px-2">
            <p className="text-xs font-bold text-white truncate">{staffName}</p>
            <p className="text-[11px] text-blue-300 font-mono">{staffMobile}</p>
          </div>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-red-600/80 transition-colors text-red-200 hover:text-white text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1E3A8A] text-white flex justify-around p-2.5 z-50 shadow-lg border-t border-blue-900">
        {visibleNavItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center p-1.5 min-w-0">
              <Icon className="w-5 h-5 mb-0.5 text-blue-200" />
              <span className="text-[10px] font-semibold truncate max-w-[65px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
