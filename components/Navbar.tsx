'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react'
import clsx from 'clsx'
import { CartModal } from './CartModal'
import { useCart } from './CartContext'


interface NavbarProps {
  activeTab?: 'men' | 'women'
  onTabChange?: (tab: 'men' | 'women') => void
}

export default function Navbar({ activeTab = 'men', onTabChange }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const { isCartOpen, toggleCart, cartItems } = useCart(); // ✅ from CartContext

  return (
    <nav className="sticky top-0 z-[9999] w-full px-4 py-3 shadow-md bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            className="block md:hidden font-semibold text-gray-700"
            onClick={() => {
              setMenuOpen(!menuOpen)
              setSearchOpen(false)
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="w-20 md:w-24 lg:w-28">
            <Image
              src="/images/TIMBU.png"
              alt="Timbu Logo"
              width={112}
              height={40}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center flex-1 justify-center gap-8">
          <div className="flex gap-4">
            <Link
              href="/men"
              className={clsx(
                'font-semibold transition-colors duration-200',
                activeTab === 'men' ? 'text-black' : 'text-gray-500 hover:text-black'
              )}
            >
              Men
            </Link>
            <Link
              href="/women"
              className={clsx(
                'font-semibold transition-colors duration-200',
                activeTab === 'women' ? 'text-black' : 'text-gray-500 hover:text-black'
              )}
            >
              Women
            </Link>
          </div>

          <div className="relative w-80 lg:w-[500px] mx-6 lg:ml-16">
            <input
              type="text"
              placeholder="Search for items"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="block md:hidden"
            onClick={() => {
              setSearchOpen(!searchOpen)
              setMenuOpen(false)
            }}
          >
            <Search className="text-gray-700" size={18} />
          </button>

          <User className="text-black hover:text-gray-700" size={22} />

          <button className="relative" onClick={toggleCart}>
            <ShoppingBag className="text-black hover:text-gray-700" size={22} />
            {cartItems.length > 0 && (
              <span className="absolute top-3 -right-1 bg-blue-700 text-white text-[10px] w-3 h-3 rounded-full flex items-center justify-center font-medium leading-none">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Search Overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 w-full z-[99999] md:hidden px-4">
            <div className="bg-white shadow-lg border border-gray-200 rounded-md p-2 mt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for items"
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-1/3 z-[99999] md:hidden px-4">
            <div className="bg-white shadow-lg border border-gray-200 rounded-md p-4 mt-2 flex flex-col gap-3">
              <Link
                href="/men"
                className={clsx(
                  'font-semibold text-base',
                  activeTab === 'men' ? 'text-black' : 'text-gray-600 hover:text-black'
                )}
                onClick={() => setMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                href="/women"
                className={clsx(
                  'font-semibold text-base',
                  activeTab === 'women' ? 'text-black' : 'text-gray-600 hover:text-black'
                )}
                onClick={() => setMenuOpen(false)}
              >
                Women
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 🔥 Cart Modal Overlay */}
      {isCartOpen && <CartModal />}
    </nav>
  )
}
