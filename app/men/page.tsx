'use client'

import React from 'react'
import Hero from '@/components/Hero'
import CategoryFilter from '@/components/CategoryFilter'
import ProductGrid from '@/components/ProductGrid'

export default function MenPage() {
  return (
    <div>
      {/* 👑 Hero section for Men */}
      <Hero
        // 👈 Update with actual image path
      />

      {/* 🎯 Category Filter */}
      <CategoryFilter
     
    
      />

      {/* 🛍️ Product Grid */}
      <ProductGrid />
    </div>
  )
}
