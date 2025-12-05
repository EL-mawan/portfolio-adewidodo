'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageCarouselProps {
  images: string[]
  autoSlideInterval?: number
  alt?: string
  className?: string
  showControls?: boolean
  showIndicators?: boolean
}

export function ImageCarousel({ 
  images, 
  autoSlideInterval = 3000,
  alt = "Image",
  className = "",
  showControls = true,
  showIndicators = true
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-slide functionality
  useEffect(() => {
    if (images.length <= 1 || isHovered) return

    const interval = setInterval(goToNext, autoSlideInterval)
    return () => clearInterval(interval)
  }, [images.length, isHovered, autoSlideInterval, goToNext])

  // Handle single image or no images
  if (images.length === 0) {
    return (
      <div className={`relative w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center ${className}`}>
        <span className="text-primary/60 font-medium">No images</span>
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <img 
          src={images[0]} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div 
      className={`relative w-full h-full overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {showControls && images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
