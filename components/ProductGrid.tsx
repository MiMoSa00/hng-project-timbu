'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/CartContext'

type ProductGridProps = {
  activeTab: 'men' | 'women'
  activeCategory: string
}

const ProductGrid: React.FC<ProductGridProps> = ({ activeTab, activeCategory }) => {
  const [visibleCount, setVisibleCount] = useState(8)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false)
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set())

  const { addToCart } = useCart()

  // Screen size handling
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 640)
      setVisibleCount(width < 640 ? 4 : 6)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Animate cards and load more visibility
  useEffect(() => {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0')
          setVisibleCards((prev) => new Set([...prev, cardIndex]))
        }
      })
    }, { threshold: 0.1, rootMargin: '50px' })

    const loadMoreObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsLoadMoreVisible(entry.isIntersecting))
    }, { threshold: 0.1, rootMargin: '100px' })

    cardRefs.current.forEach((card, index) => {
      if (card) {
        card.setAttribute('data-index', index.toString())
        cardObserver.observe(card)
      }
    })

    if (loadMoreRef.current) {
      loadMoreObserver.observe(loadMoreRef.current)
    }

    return () => {
      cardObserver.disconnect()
      loadMoreObserver.disconnect()
    }
  }, [visibleCount])

  // Reset animation and ref tracking
  useEffect(() => {
    setVisibleCards(new Set())
    cardRefs.current = []
  }, [visibleCount, activeTab, activeCategory])

  const allProducts = [
    // Men
    { id: "men_1", name: "Reclaimed Vintage men loose fit jean", description: "W34 L42", price: 4000, image: "/images/img12.png", category: "jeans" },
    { id: "men_2", name: "Plain Grey Unisex Hoodie", description: "All sizes", price: 8500, image: "/images/img8.png", category: "hoodies" },
    { id: "men_3", name: "Reclaimed Vintage trousers black", description: "W34 L42", price: 4500, image: "/images/img13.png", category: "pants" },
    { id: "men_4", name: "Men's Round Neck T-Shirt", description: "All sizes", price: 8000, image: "/images/img6.png", category: "tshirts" },
    { id: "men_5", name: "Dark Grey Summer Shorts", description: "All sizes", price: 5000, image: "/images/img7.png", category: "shorts" },
    { id: "men_6", name: "Osc Signature Long Sleeve T-Shirts", description: "All sizes", price: 8000, image: "/images/img9.png", category: "tshirts" },
    { id: "men_7", name: "Men's Corporate Suit", description: "All sizes", price: 42000, image: "/images/img10.png", category: "suits" },
    { id: "men_8", name: "Sky Stock Blue Jean", description: "All sizes", price: 14500, image: "/images/img12.png", category: "jeans" },

    // Women (sample)
    { id: "women_1", name: "Women's Pink Hoodie", description: "All sizes", price: 9500, image: "/images/img8.png", category: "hoodies" },
    { id: "women_2", name: "Elegant Summer Dress", description: "All sizes", price: 15000, image: "/images/img13.png", category: "dresses" },
  ]

  const filteredProducts = allProducts.filter(p => 
    p.id.startsWith(activeTab) && (activeCategory === 'all' || p.category === activeCategory)
  )

  const displayedProducts = filteredProducts.slice(0, visibleCount)
  const hasMoreProducts = visibleCount < filteredProducts.length

  const loadMore = () => {
    const increment = isMobile ? 4 : 8
    setVisibleCount(prev => Math.min(prev + increment, filteredProducts.length))
  }

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 })
    setAddedToCart(prev => new Set([...prev, product.id]))

    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  return (
    <section className="w-full px-4 py-8">
      <style jsx>{`
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes slideFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-animate {
          animation: slideFadeIn 0.6s ease-out forwards;
        }

        .bounce-slow {
          animation: bounceSlow 2.5s infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 capitalize">
          {activeTab === 'men' ? "Men's Collection" : "Women's Collection"}
        </h1>
        <p className="text-gray-600 mb-6">{filteredProducts.length} items</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { cardRefs.current[index] = el }}
              className={`border p-2 bg-white transform scale-95 transition-all duration-700 ease-out ${
                visibleCards.has(index) ? 'opacity-100 scale-100 card-animate' : 'opacity-0'
              }`}
            >
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden group">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`absolute bottom-2 right-2 p-2 rounded bg-white shadow hover:scale-110 transition ${
                    addedToCart.has(product.id) ? 'bg-green-500 text-white' : ''
                  }`}
                >
                  <ShoppingBag size={16} />
                </button>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.description}</p>
                <p className="font-bold text-sm">₦{product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          You’ve viewed {displayedProducts.length} of {filteredProducts.length} products
        </p>

        <div ref={loadMoreRef} className="text-center mt-6">
          <button
            onClick={hasMoreProducts ? loadMore : undefined}
            disabled={!hasMoreProducts}
            className="px-10 py-3 text-lg border border-black text-black font-semibold disabled:opacity-50 bounce-slow"
          >
            {hasMoreProducts ? 'Load More' : 'No More Products'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
