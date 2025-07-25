'use client'

import { useState } from 'react'
// import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CategoryFilter from '../components/CategoryFilter'
import ProductGrid from '../components/ProductGrid'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men')
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <>
      {/* Navbar */}
      {/* <Navbar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      /> */}
      
      <main className="min-h-screen bg-gray-50 overflow-x-hidden">
        {/* Hero Section */}
        <Hero />
        
        {/* Vertical Space */}
        <div className="h-8"></div>
        
        {/* Category Filter Section */}
        <CategoryFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {/* Product Grid Section */}
        <ProductGrid 
          activeTab={activeTab}
          activeCategory={activeCategory}
        />
      </main>
    </>
  )
}
