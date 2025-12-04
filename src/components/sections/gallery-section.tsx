'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TiltCard } from '@/components/ui/tilt-card'
import { useAutoRefresh } from '@/contexts/realtime-context'
import { Loader2 } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface GalleryImage {
  id: string
  title: string
  imageUrl: string
  category?: string
  description?: string
}

export function GallerySection() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        setGalleryImages(data)
        if (!activeImage) {
          setActiveImage(data[0])
        }
      }
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useAutoRefresh(fetchGallery)

  const useSlider = galleryImages.length > 5

  // Show loading state
  if (isLoading) {
    return (
      <section id="gallery" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  // Show nothing if no gallery images
  if (galleryImages.length === 0 || !activeImage) {
    return null
  }

  return (
    <section id="gallery" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            My <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A glimpse into my work environment and creative process
          </p>
        </motion.div>

        {/* Featured Image Layout (Flowbite Style) */}
        <div className="grid gap-4">
          {/* Main Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TiltCard className="h-full">
              <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-video w-full">
                <img
                  className="h-full w-full object-cover"
                  src={activeImage.imageUrl}
                  alt={activeImage.title}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 md:p-8">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{activeImage.title}</h3>
                  {activeImage.category && (
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-sm backdrop-blur-sm border border-primary/30">
                      {activeImage.category}
                    </span>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Thumbnails */}
          {useSlider ? (
            <div className="w-full px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={image.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => setActiveImage(image)}
                        className="cursor-pointer group"
                      >
                        <div className={`relative rounded-lg overflow-hidden h-24 md:h-32 transition-all duration-300 ${
                          activeImage.id === image.id 
                            ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-95 opacity-100' 
                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                        }`}>
                          <img
                            className="h-full w-full object-cover"
                            src={image.imageUrl}
                            alt={image.title}
                          />
                          {activeImage.id !== image.id && (
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                          )}
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveImage(image)}
                  className="cursor-pointer group"
                >
                  <div className={`relative rounded-lg overflow-hidden h-24 md:h-32 transition-all duration-300 ${
                    activeImage.id === image.id 
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-95 opacity-100' 
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}>
                    <img
                      className="h-full w-full object-cover"
                      src={image.imageUrl}
                      alt={image.title}
                    />
                    {activeImage.id !== image.id && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
