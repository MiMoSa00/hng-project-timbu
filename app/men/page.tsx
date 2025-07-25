'use client'

import React, { useState } from 'react'
import Hero from '@/components/Hero'
import CategoryFilter from '@/components/CategoryFilter'
import ProductGrid from '@/components/ProductGrid'

export default function MenPage() {
  const [activeTab] = useState<'men' | 'women'>('men') // fixed tab: men
  const [activeCategory, setActiveCategory] = useState<string>('all') // allow filtering

  return (
    <div>
      {/* 👑 Hero section for Men */}
      <Hero
        // Optional props can go here if your Hero accepts any
      />

      {/* 🎯 Category Filter */}
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 🛍️ Product Grid */}
      <ProductGrid 
        activeTab={activeTab}
        activeCategory={activeCategory}
      />
    </div>
  )
}
