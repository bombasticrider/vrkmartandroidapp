'use client'

import Header from '@/components/customer/Header'
import BottomNav from '@/components/customer/BottomNav'
import PincodeModal from '@/components/customer/PincodeModal'
import ViewOnlyBanner from '@/components/customer/ViewOnlyBanner'
import CartDrawer from '@/components/customer/CartDrawer'
import WelcomeBenefitsModal from '@/components/promotions/WelcomeBenefitsModal'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface pb-20">
      <Header />
      <ViewOnlyBanner />
      <PincodeModal />
      <CartDrawer />
      <WelcomeBenefitsModal />
      <main className="w-full max-w-2xl mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
