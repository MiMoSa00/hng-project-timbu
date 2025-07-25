'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import Hero from '@/components/Hero' // Adjust path as needed
import CategoryFilter from '@/components/CategoryFilter' // Adjust path as needed
import { useCart } from '@/components/CartContext' // Import cart hook

export default function WomensPage() {
  const [visibleCount, setVisibleCount] = useState(8)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [addedToCart, setAddedToCart] = useState<Set<number>>(new Set())

  // Get cart functions
  const { addToCart } = useCart()

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
      if (window.innerWidth < 640) {
        setVisibleCount(4)
      } else {
        setVisibleCount(6)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Intersection Observer for card animations
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Observer for cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards(prev => new Set([...prev, cardIndex]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    // Observer for Load More button
    const loadMoreObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsLoadMoreVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    )

    // Observe cards
    cardRefs.current.forEach((card, index) => {
      if (card) {
        card.setAttribute('data-index', index.toString())
        cardObserver.observe(card)
        observers.push(cardObserver)
      }
    })

    // Observe Load More button
    if (loadMoreRef.current) {
      loadMoreObserver.observe(loadMoreRef.current)
      observers.push(loadMoreObserver)
    }

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [visibleCount])

  // Women's products data
  const products = [
    { id: "1", name: "Women's Elegant Midi Dress - Floral Print", description: "S, M, L, XL available", price: 8500, image: "/images/female1.png" },
    { id: "2", name: "Women's Casual Blouse - White Cotton", description: "All sizes available", price: 4500, image: "/images/img8.png" },
    { id: "3", name: "Women's High-Waist Pleated Skirt", description: "S, M, L available", price: 5500, image: "/images/female2.png" },
    { id: "4", name: "Women's Silk Blouse - Navy Blue", description: "All sizes available", price: 7000, image: "/images/female3.png" },
    { id: "5", name: "Women's Blazer Jacket - Professional Style", description: "S, M, L, XL available", price: 12500, image: "/images/female4.png" },
    { id: "6", name: "Women's Skinny Jeans - Dark Wash", description: "W26-W34 available", price: 6800, image: "/images/female5.png" },
    { id: "7", name: "Women's Knit Sweater - Burgundy", description: "All sizes available", price: 9200, image: "/images/female6.png" },
    { id: "8", name: "Women's Long Cardigan - Grey", description: "S, M, L, XL available", price: 8800, image: "/images/female7.png" },
  ]

  const displayedProducts = products.slice(0, visibleCount)
  const hasMoreProducts = visibleCount < products.length

  // Reset visible cards when component mounts
  useEffect(() => {
    setVisibleCards(new Set())
    cardRefs.current = []
  }, [visibleCount])

  const loadMore = () => {
    if (isMobile) {
      setVisibleCount(prev => Math.min(prev + 4, products.length))
    } else {
      setVisibleCount(prev => Math.min(prev + 8, products.length))
    }
  }

  // Handle add to cart with visual feedback
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })

    // Add visual feedback
    setAddedToCart(prev => new Set([...prev, parseInt(product.id)]))
    
    // Remove visual feedback after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev)
        newSet.delete(parseInt(product.id))
        return newSet
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Category Filter Section */}
      <CategoryFilter 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      {/* Women's Products Section */}
      <section className="w-full px-2 sm:px-4 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with fade-in animation */}
        <div className="mb-4 sm:mb-6 md:mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-1 sm:mb-2">
            Women's Collection
          </h1>
          <p className="text-black text-sm sm:text-base md:text-lg font-medium">
            {products.length} items
          </p>
        </div>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className={`bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-500 transform ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: `${(index % 4) * 100}ms`,
              }}
            >
              {/* Image Container with hover effects */}
              <div className="aspect-[3/4] sm:aspect-[3/5] bg-gray-100 relative overflow-hidden group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Shopping Bag Icon with hover animation and cart functionality */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className={`absolute bottom-1 right-1 sm:bottom-2 sm:right-2 md:bottom-3 md:right-3 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 rounded-none shadow-md hover:scale-110 hover:rotate-12 transition-all duration-300 ease-out transform ${
                    addedToCart.has(parseInt(product.id))
                      ? 'bg-green-500 bg-opacity-90 text-white'
                      : 'bg-white bg-opacity-80 hover:bg-opacity-100 text-black'
                  }`}
                >
                  <ShoppingBag size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>

                {/* Added to cart notification */}
                {addedToCart.has(parseInt(product.id)) && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded animate-bounce">
                    Added!
                  </div>
                )}
              </div>
              
              {/* Content with stagger animation */}
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 mb-1 sm:mb-2 line-clamp-2 leading-tight hover:text-gray-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1 sm:mb-2 line-clamp-1">
                  {product.description}
                </p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button with bouncing animation */}
        <div 
          ref={loadMoreRef}
          className="flex flex-col items-center mt-6 sm:mt-8 md:mt-10"
        >
          <p className={`text-gray-500 font-medium text-lg sm:text-lg mb-4 transition-all duration-700 ${
            isLoadMoreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            You've viewed {visibleCount} of {products.length} products
          </p>
          
          <button
            onClick={hasMoreProducts ? loadMore : undefined}
            className={`px-14 py-3 bg-transparent text-black border border-black font-semibold rounded-none hover:bg-gray-300 transition-all duration-300 text-sm sm:text-lg transform hover:scale-105 ${
              isLoadMoreVisible && hasMoreProducts
                ? 'animate-bounce opacity-100 translate-y-0'
                : isLoadMoreVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            } ${!hasMoreProducts ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg active:scale-95'}`}
            disabled={!hasMoreProducts}
          >
            {hasMoreProducts ? 'Load More' : 'No More Products'}
          </button>
        </div>
      </div>
     </section>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-8px);
          }
          70% {
            transform: translateY(-4px);
          }
          90% {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  )
}