import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/newimg.png"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      
      {/* Overlay Image - Centered with Rotation */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-[200px] h-[200px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[300px] xl:w-[450px] xl:h-[450px] animate-spin-slow">
          <Image
            src="/images/Group.png"
            alt="Overlay Design"
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      {/* Text Overlay - Positioned to the right */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 sm:pr-16 md:pr-36 lg:pr-44 xl:pr-38 z-20">
        <div className="flex flex-col items-end">
  <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-left">
    <span className="block">Discover Your Perfect</span>
    <span className="block">Style With Us</span>
  </h1>
</div>

      </div>

      {/* Custom CSS for smooth rotation */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  )
}