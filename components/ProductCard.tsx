'use client'

import Image from 'next/image'

interface ProductCardProps {
  image: string
  name: string
  price: string
  description: string
}

const ProductCard = ({ image, name, price, description }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="relative w-full h-60 rounded-md overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
      </div>
      <h3 className="mt-4 font-semibold text-lg">{name}</h3>
      <p className='text-gray-600 text-sm'>{description}</p>
      <p className="text-gray-600">{price}</p>
    </div>
  )
}

export default ProductCard
