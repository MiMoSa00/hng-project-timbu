'use client'

import { useState } from 'react'
import { Filter, ChevronDown, ChevronUp } from 'lucide-react'
import clsx from 'clsx'

interface CategoryFilterProps {
  activeCategory?: string
  onCategoryChange?: (category: string) => void
}

export default function CategoryFilter({ 
  activeCategory = 'all', 
  onCategoryChange 
}: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const categories = [
    'All',
    'New arrivals',
    'Under 5k',
    'Jeans',
    'T-shirts',
    'Shorts',
    'Formals',
    'Hats'
  ]

  const handleCategoryClick = (category: string) => {
    const categoryKey = category.toLowerCase().replace(' ', '-')
    setSelectedCategory(categoryKey)
    onCategoryChange?.(categoryKey)
    setIsMenuOpen(false) // Close menu after selection on mobile
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <section className="w-full px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout - MD and above */}
        <div className="hidden md:flex items-center justify-between">
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            {categories.map((category) => {
              const categoryKey = category.toLowerCase().replace(' ', '-')
              const isActive = selectedCategory === categoryKey
              const isHovered = hoveredButton === categoryKey
              
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  onMouseEnter={() => setHoveredButton(categoryKey)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className={clsx(
                    'px-4 py-2 rounded-none text-sm font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95',
                    isActive
                      ? 'bg-black text-white'
                      : 'bg-transparent text-black border border-black hover:bg-gray-200',
                    isHovered && !isActive && 'animate-bounce-gentle'
                  )}
                >
                  {category}
                </button>
              )
            })}
          </div>

          {/* Filters Button */}
          <button 
            onMouseEnter={() => setHoveredButton('filters')}
            onMouseLeave={() => setHoveredButton(null)}
            className={clsx(
              'flex items-center gap-2 px-6 py-2 bg-transparent border border-black rounded-none text-sm font-semibold text-black hover:bg-gray-200 transition-all duration-200 ml-4 transform hover:scale-105 active:scale-95',
              hoveredButton === 'filters' && 'animate-bounce-gentle'
            )}
          >
            <Filter size={16} className="transition-transform duration-200" />
            Filters
          </button>
        </div>

        {/* Mobile Layout - SM and below */}
        <div className="md:hidden relative">
          {/* Mobile Filters Button */}
          <button 
            onClick={toggleMenu}
            onMouseEnter={() => setHoveredButton('mobile-filters')}
            onMouseLeave={() => setHoveredButton(null)}
            className={clsx(
              'flex items-center justify-center gap-2 w-full px-6 py-3 bg-transparent border border-black rounded-none text-sm font-semibold text-black hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95',
              hoveredButton === 'mobile-filters' && 'animate-bounce-gentle'
            )}
          >
            <Filter size={16} className="transition-transform duration-200" />
            Filters 
            <div className="transition-transform duration-200">
              {isMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg z-50 rounded-md animate-slideDown">
              <div className="py-2">
                {categories.map((category, index) => {
                  const categoryKey = category.toLowerCase().replace(' ', '-')
                  const isActive = selectedCategory === categoryKey
                  const isHovered = hoveredButton === `mobile-${categoryKey}`
                  
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      onMouseEnter={() => setHoveredButton(`mobile-${categoryKey}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                      className={clsx(
                        'w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95',
                        isActive
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100',
                        isHovered && !isActive && `animate-bounce-gentle-delay-${index}`
                      )}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounceGentle {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) scale(1.05);
          }
          40% {
            transform: translateY(-8px) scale(1.05);
          }
          60% {
            transform: translateY(-4px) scale(1.05);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-gentle {
          animation: bounceGentle 1.2s ease-in-out infinite;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        /* Individual delay classes for mobile menu items */
        .animate-bounce-gentle-delay-0 {
          animation: bounceGentle 1.2s ease-in-out infinite;
          animation-delay: 0ms;
        }
        .animate-bounce-gentle-delay-1 {
          animation: bounceGentle 1.2s ease-in-out infinite;
          animation-delay: 50ms;
        }
        .animate-bounce-gentle-delay-2 {
          animation: bounceGentle 1.2s ease-in-out infinite;
          animation-delay: 100ms;
        }
        .animate-bounce-gentle-delay-3 {
          animation: bounceGentle 1.2s ease-in-out infinite;
          animation-delay: 150ms;
        }
        .animate-bounce-gentle-delay-4 {
          animation: bounceGentle 1.2s ease-in-out infinite;
          animation-delay: 200ms;
        }
        .animate-bounce-gentle-delay-5 {
          animation: bounceGentle 1.2s ease-in-out infinite;
          animation-delay: 250ms;
        }
        .animate-bounce-gentle-delay-6 {
          animation: bounceGentle 1.2s ease-in-out infinite;
          animation-delay: 300ms;
        }
        .animate-bounce-gentle-delay-7 {
          animation: bounceGentle 1.2s ease-in-out infinite;
          animation-delay: 350ms;
        }

        /* Prevent bounce on active buttons */
        button.bg-black {
          animation: none !important;
        }
      `}</style>
    </section>
  )
}