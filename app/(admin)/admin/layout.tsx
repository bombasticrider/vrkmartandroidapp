import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const session = cookieStore.get('vrk_admin_session');

  // If no session (e.g. on /admin/login), render children without admin sidebar
  // (middleware.ts handles redirecting unauthorized requests from protected admin pages)
  if (!session?.value) {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Members', href: '/admin/members', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1E3A8A] text-white min-h-screen p-4 sticky top-0 h-screen">
        <div className="mb-8 p-2">
          <div className="w-36 h-9 relative mb-1.5">
            <Image
              src="/icons/header-logo.png"
              alt="VRK Mart Logo"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Admin Portal</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800 transition-colors">
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-700 transition-colors text-red-300 hover:text-white mt-auto">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1E3A8A] text-white flex justify-around p-3 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center p-2">
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
