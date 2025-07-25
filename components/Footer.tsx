'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Instagram, ChevronDown, ChevronUp } from 'lucide-react'
import { FaTiktok } from 'react-icons/fa'
import LegalFooter from './LegalFooter' // Import the legal footer

interface OpenSections {
  shop: boolean;
  support: boolean;
  about: boolean;
}

export default function Footer(): React.ReactElement {
  const [openSections, setOpenSections] = useState<OpenSections>({
    shop: false,
    support: false,
    about: false
  })

  const toggleSection = (section: keyof OpenSections): void => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gray-100 pt-8 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout - LG & MD */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-2 md:gap-8 lg:gap-12">
              {/* Left Section - Brand & Social */}
              <div className="space-y-6">
                {/* Brand Logo */}
                <div className="w-32 lg:w-36">
                  <Image
                    src="/images/TIMBU.png"
                    alt="Timbu Logo"
                    width={144}
                    height={48}
                    className="w-full h-auto object-contain"
                  />
                </div>
                
                {/* Brand Description */}
                <div className="max-w-sm">
                  <p className="text-gray-600 text-sm lg:text-base leading-snug">
                    We breathe life into pre-loved garments, transforming them into timeless expressions of style that echo whispers of the past.
                  </p>
                  <p className="text-gray-600 text-sm lg:text-base leading-snug mt-3">
                    Welcome to TIMBU, a place where fashion has a heart, and your story unfolds with every attire you put on.
                  </p>
                </div>
                
                {/* Social Icons */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Instagram size={20} className="text-black" />
                    <span className="text-black text-sm">TIMBU_ng</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaTiktok size={20} className="text-black" />
                    <span className="text-black text-sm">TikTok</span>
                  </div>
                </div>
              </div>

              {/* Right Section - All Navigation Links Side by Side */}
              <div className="flex justify-between space-x-8 lg:space-x-12">
                {/* Shop Section */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-black mb-4">Shop</h2>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-black font-medium text-sm">Men</a></li>
                    <li><a href="#" className="text-black font-medium text-sm">Women</a></li>
                    <li><a href="#" className="text-black font-medium text-sm">Unisex</a></li>
                  </ul>
                </div>

                {/* Customer Support Section */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-black mb-4">Customer Support</h2>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-black font-medium text-sm">FAQs</a></li>
                    <li><a href="#" className="text-black font-medium text-sm">Shipping</a></li>
                    <li><a href="#" className="text-black font-medium text-sm">Returns</a></li>
                    <li><a href="#" className="text-black font-medium text-sm">Help & Contact</a></li>
                  </ul>
                </div>

                {/* About Section */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-black mb-4">About TIMBU</h2>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-black font-medium text-sm">The Story</a></li>
                    <li><a href="#" className="text-black font-medium text-sm">Blog</a></li>
                    <li><a href="#" className="text-black font-medium text-sm">Careers</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - SM */}
          <div className="md:hidden space-y-6">
            {/* Brand & Social - Always Visible */}
            <div className="space-y-4">
              {/* Brand Logo */}
              <div className="w-28">
                <Image
                  src="/images/TIMBU.png"
                  alt="Timbu Logo"
                  width={112}
                  height={40}
                  className="w-full h-auto object-contain"
                />
              </div>
              
              {/* Brand Description */}
              <div className="max-w-xs">
                <p className="text-gray-600 text-sm leading-snug">
                  We breathe life into pre-loved garments, transforming them into timeless expressions of style that echo whispers of the past.
                </p>
                <p className="text-gray-600 text-sm leading-snug mt-3">
                  Welcome to TIMBU, a place where fashion has a heart, and your story unfolds with every attire you put on.
                </p>
              </div>
              
              {/* Social Icons */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Instagram size={18} className="text-black font-semibold" />
                  <span className="text-black text-sm font-semibold">TIMBU_ng</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTiktok size={18} className="text-black" />
                  <span className="text-black text-sm font-semibold">TikTok</span>
                </div>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-0">
              {/* Shop Section */}
              <div className="border-t border-gray-300">
                <button
                  onClick={() => toggleSection('shop')}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <h2 className="text-lg font-semibold text-black">Shop</h2>
                  {openSections.shop ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </button>
                {openSections.shop && (
                  <div className="pb-4">
                    <ul className="space-y-2">
                      <li><a href="#" className="text-black text-base font-medium block">Men</a></li>
                      <li><a href="#" className="text-black text-base font-medium block">Women</a></li>
                      <li><a href="#" className="text-black text-base font-medium block">Unisex</a></li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Customer Support Section */}
              <div className="border-t border-gray-300">
                <button
                  onClick={() => toggleSection('support')}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <h2 className="text-lg font-semibold text-black">Customer Support</h2>
                  {openSections.support ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </button>
                {openSections.support && (
                  <div className="pb-4">
                    <ul className="space-y-2">
                      <li><a href="#" className="text-black font-medium  text-base block">FAQs</a></li>
                      <li><a href="#" className="text-black font-medium  text-base block">Shipping</a></li>
                      <li><a href="#" className="text-black font-medium  text-base block">Returns</a></li>
                      <li><a href="#" className="text-black font-medium  text-base block">Help & Contact</a></li>
                    </ul>
                  </div>
                )}
              </div>

              {/* About Section */}
              <div className="border-t border-b border-gray-300">
                <button
                  onClick={() => toggleSection('about')}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <h2 className="text-lg font-semibold text-black">About TIMBU</h2>
                  {openSections.about ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </button>
                {openSections.about && (
                  <div className="pb-4">
                    <ul className="space-y-2">
                      <li><a href="#" className="text-black font-medium  text-sm block">The Story</a></li>
                      <li><a href="#" className="text-black font-medium  text-sm block">Blog</a></li>
                      <li><a href="#" className="text-black font-medium  text-sm block">Careers</a></li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Footer - Include for all pages except checkout */}
      <LegalFooter />
    </>
  )
}