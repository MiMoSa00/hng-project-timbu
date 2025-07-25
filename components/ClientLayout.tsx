'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import { CartProvider } from './CartContext'
import { CartModal } from './CartModal'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men')
  const pathname = usePathname()

  // Define the paths where Footer should not show
  const hideFooterPaths = ['/checkout']

  const shouldShowFooter = !hideFooterPaths.includes(pathname)

  return (
    <CartProvider>
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="min-h-screen">
        {children}
      </main>

      {/* Only show footer if not on checkout page */}
      {shouldShowFooter && <Footer />}

      <CartModal />
    </CartProvider>
  )
}
