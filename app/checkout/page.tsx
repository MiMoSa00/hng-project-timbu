'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/components/CartContext'
import LegalFooter from '@/components/LegalFooter' // Import the legal footer

interface DeliveryInfo {
  state: string;
  city: string;
  town: string;
  address: string;
}

type DeliveryMethod = 'pickup' | 'standard' | null;

export default function CheckoutPage(): React.ReactElement {
  const { cartItems } = useCart()
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<DeliveryMethod>(null)
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    state: '',
    city: '',
    town: '',
    address: ''
  })

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const deliveryFee = selectedDeliveryMethod === 'standard' ? 2500 : 0
  const total = subtotal + deliveryFee

  const handleDeliveryInfoChange = (field: keyof DeliveryInfo, value: string): void => {
    setDeliveryInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDeliveryMethodChange = (method: 'pickup' | 'standard'): void => {
    setSelectedDeliveryMethod(method)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-4 sm:mb-6 lg:mb-8">Checkout</h1>
          
          <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Order Summary - Shows first on mobile, second on desktop */}
            <div className="xl:hidden w-full mb-4 sm:mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-black">Order Total</h2>
                  <button className="text-black  font-medium text-sm self-start sm:self-auto">
                    Edit
                  </button>
                </div>

                {/* Cart Items */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-h-64 sm:max-h-80 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4 text-sm sm:text-base">No items in cart</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-200 last:border-b-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-2 mb-1">
                            {item.name}
                          </h3>
                          <div className="text-xs text-gray-600 space-y-0.5">
                            <p>Price: ₦{item.price.toLocaleString()}</p>
                            <p>Qty: {item.quantity}</p>
                            <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Order Summary */}
                {cartItems.length > 0 && (
                  <>
                    {/* Items Count and Subtotal */}
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <p className="text-sm sm:text-base text-gray-700">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                      <p className="font-medium text-sm sm:text-base text-gray-900">₦{subtotal.toLocaleString()}</p>
                    </div>

                    {/* Delivery Fee */}
                    <div className="flex justify-between items-center mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                      <p className="text-sm sm:text-base text-gray-700">Delivery</p>
                      <p className="font-medium text-sm sm:text-base text-gray-900">
                          ₦1,500
                        {/* {selectedDeliveryMethod === 'standard' ? '₦2,500' : '₦0'} */}
                      </p>
                    </div>

                    {/* Total Price */}
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <p className="text-base sm:text-lg font-semibold text-black">Total Price</p>
                      <p className="text-base sm:text-lg font-bold text-black">₦{total.toLocaleString()}</p>
                    </div>

                    {/* Pay Button */}
                    <button 
                      className="w-full bg-black text-white py-3 sm:py-4 rounded-lg font-semibold  transition-colors text-base sm:text-base"
                      disabled={!selectedDeliveryMethod}
                    >
                      Pay
                    </button>

                    {!selectedDeliveryMethod && (
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Please select a delivery method to continue
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Left Side - Main Checkout Information */}
            <div className="flex-1 space-y-4 sm:space-y-6">
              
              {/* Card 1: Buyer Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                  <h1 className="text-lg sm:text-xl font-semibold text-black">Buyer Information</h1>
                  <button className="text-black font-medium text-sm self-start sm:self-auto">
                    Edit
                  </button>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-sm sm:text-base text-black">42 Westend Road, Beckingson Avenue, Lagos</p>
                  <p className="text-sm sm:text-base text-black">0813 857 3833</p>
                  <p className="text-sm sm:text-base text-black">linwhitfall@gmail.com</p>
                </div>
              </div>

              {/* Card 2: Delivery Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-black mb-4 sm:mb-6">Delivery Information</h2>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1 sm:mb-2">State</label>
                    <input
                      type="text"
                      value={deliveryInfo.state}
                      onChange={(e) => handleDeliveryInfoChange('state', e.target.value)}
                      placeholder="Enter your state"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500  focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1 sm:mb-2">City</label>
                    <input
                      type="text"
                      value={deliveryInfo.city}
                      onChange={(e) => handleDeliveryInfoChange('city', e.target.value)}
                      placeholder="Enter your city"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500  focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1 sm:mb-2">Town</label>
                    <input
                      type="text"
                      value={deliveryInfo.town}
                      onChange={(e) => handleDeliveryInfoChange('town', e.target.value)}
                      placeholder="Enter your town"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500  focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1 sm:mb-2">Address</label>
                    <input
                      type="text"
                      value={deliveryInfo.address}
                      onChange={(e) => handleDeliveryInfoChange('address', e.target.value)}
                      placeholder="Enter your full address"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500   focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: Delivery Method */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">Delivery Method</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Enter your shipping address to view available shipping methods.</p>
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {/* Pickup Option */}
                  <div className="flex items-start gap-3 p-3 sm:p-4  rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" 
                       onClick={() => handleDeliveryMethodChange('pickup')}>
                    <div className="flex items-center justify-center w-5 h-5 mt-0.5">
                      <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center">
                        {selectedDeliveryMethod === 'pickup' && (
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm sm:text-base text-gray-900">Pickup</p>
                      {/* <p className="text-xs sm:text-sm text-gray-600">Free - Collect from store</p> */}
                    </div>
                    {/* <div className="text-sm sm:text-base font-medium text-gray-900">
                      ₦0
                    </div> */}
                  </div>

                  {/* Standard Delivery Option */}
                  <div className="flex items-start gap-3 p-3 sm:p-4  rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                       onClick={() => handleDeliveryMethodChange('standard')}>
                    <div className="flex items-center justify-center w-5 h-5 mt-0.5">
                      <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center">
                        {selectedDeliveryMethod === 'standard' && (
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm sm:text-base text-gray-900">Standard Delivery</p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        <span>Enter your delivery information to view available delivery prices.</span>
                      </p>
                    </div>
                    {/* <div className="text-sm sm:text-base font-medium text-gray-900">
                      ₦2,500
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Card 4: Empty White Card - Hidden on mobile */}
              <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 h-36 sm:h-36">
                {/* Empty card as requested */}
              </div>
            </div>

            {/* Right Side - Order Summary (Desktop Only) */}
            <div className="hidden xl:block xl:w-96 lg:w-80 w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 xl:sticky xl:top-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-black">Order Total</h2>
                  <button className="text-black  font-medium text-sm self-start sm:self-auto">
                    Edit
                  </button>
                </div>

                {/* Cart Items */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-h-64 sm:max-h-80 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4 text-sm sm:text-base">No items in cart</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-200 last:border-b-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-2 mb-1">
                            {item.name}
                          </h3>
                          <div className="text-xs text-gray-600 space-y-0.5">
                            <p>Price: ₦{item.price.toLocaleString()}</p>
                            <p>Qty: {item.quantity}</p>
                            <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Order Summary */}
                {cartItems.length > 0 && (
                  <>
                    {/* Items Count and Subtotal */}
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <p className="text-sm sm:text-base text-gray-700">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                      <p className="font-medium text-sm sm:text-base text-gray-900">₦{subtotal.toLocaleString()}</p>
                    </div>

                    {/* Delivery Fee */}
                    <div className="flex justify-between items-center mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                      <p className="text-sm sm:text-base text-gray-700">Delivery</p>
                      <p className="font-medium text-sm sm:text-base text-gray-900">
                          ₦1,500
                        {/* {selectedDeliveryMethod === 'standard' ? '₦2,500' : '₦0'} */}
                      </p>
                    </div>

                    {/* Total Price */}
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <p className="text-base sm:text-lg font-semibold text-black">Total Price</p>
                      <p className="text-base sm:text-lg font-bold text-black">₦{total.toLocaleString()}</p>
                    </div>

                    {/* Pay Button */}
                    <button 
                      className="w-full bg-black text-white py-3 sm:py-4 rounded-lg font-semibold  transition-colors text-sm sm:text-base"
                      disabled={!selectedDeliveryMethod}
                    >
                      Pay 
                    </button>

                    {!selectedDeliveryMethod && (
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Please select a delivery method to continue
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legal Footer Only */}
      <LegalFooter />
    </>
  )
}