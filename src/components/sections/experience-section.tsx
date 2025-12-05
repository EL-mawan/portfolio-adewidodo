'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Calendar, MapPin, Briefcase, X } from 'lucide-react'
import { TiltCard } from '@/components/ui/tilt-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog'
import { ImageCarousel } from '@/components/ui/image-carousel'

interface Experience {
  id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
  image?: string
  images?: string[]
  current: boolean
  order: number
}

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

  useEffect(() => {
    fetch('/api/experience')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setExperiences(data)
        }
      })
      .catch(console.error)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  // Fallback placeholder images when no image is provided
  const getPlaceholderImage = (index: number) => {
    const images = [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
    ]
    return images[index % images.length]
  }

  // Get image - use database image if available, otherwise use placeholder
  const getExperienceImage = (experience: Experience, index: number) => {
    return experience.image || getPlaceholderImage(index)
  }

  return (
    <section id="experience" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
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
            Work <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the companies I've worked with
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-linear-to-b from-primary via-primary/50 to-transparent" />

          {/* Experience Cards Container with Scroll */}
          <div className="max-h-[800px] overflow-y-auto pr-4 -mr-4 space-y-12 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40 transition-colors">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <TiltCard>
                    <div onClick={() => setSelectedExperience(experience)} className="cursor-pointer">
                      <Card className="border-0 shadow-xl h-[450px] relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl">
                        {/* Full Background Image Section */}
                        <div className="absolute inset-0 w-full h-full">
                          {experience.images && experience.images.length > 0 ? (
                            <div className="absolute inset-0 w-full h-full">
                              <ImageCarousel
                                images={experience.images}
                                alt={experience.company}
                                autoSlideInterval={3000}
                                showControls={true}
                                showIndicators={true}
                                className="w-full h-full"
                              />
                            </div>
                          ) : experience.image ? (
                            <img 
                              src={experience.image}
                              alt={experience.company}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="h-full w-full bg-linear-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center">
                              <Briefcase className="w-16 h-16 text-primary/40 mb-3" />
                            </div>
                          )}
                          
                          {/* Dark Gradient Overlay for Readability */}
                          <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 to-transparent z-10" />
                        </div>

                        {/* Top Overlay: Company Name */}
                        <div className="absolute top-6 left-6 z-20">
                          <div className="flex items-center gap-3 text-white">
                            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
                              <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-wide drop-shadow-md text-white">{experience.company}</span>
                          </div>
                        </div>

                        {/* Bottom Overlay: Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                          <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary-foreground transition-colors">
                                  {experience.title}
                                </h3>
                                {experience.current && (
                                  <Badge variant="secondary" className="bg-primary text-primary-foreground border-0 mt-1">
                                    Current
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-300">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-primary-foreground/80" />
                                <span>
                                  {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate!)}
                                </span>
                              </div>
                              {experience.location && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4 text-primary-foreground/80" />
                                  <span>{experience.location}</span>
                                </div>
                              )}
                            </div>

                            {/* Description Preview */}
                            {experience.description && (
                              <p className="text-gray-300 leading-relaxed line-clamp-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto">
                                {experience.description}
                              </p>
                            )}
                            
                            <div className="mt-4 text-primary-foreground text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                              Read more <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {experiences.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-primary/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Experience Yet</h3>
            <p className="text-muted-foreground">
              Professional experience will be added here soon.
            </p>
          </div>
        )}

        {/* Detail Popup */}
        <Dialog open={!!selectedExperience} onOpenChange={(open) => !open && setSelectedExperience(null)}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden border-0 bg-background/95 backdrop-blur-xl">
            <DialogTitle className="sr-only">Experience Details</DialogTitle>
            {selectedExperience && (
              <div className="flex flex-col max-h-[90vh] overflow-y-auto">
                {/* Header Image */}
                <div className="relative h-80 w-full shrink-0">
                  {selectedExperience.images && selectedExperience.images.length > 0 ? (
                    <ImageCarousel
                      images={selectedExperience.images}
                      alt={selectedExperience.company}
                      autoSlideInterval={4000}
                      showControls={true}
                      showIndicators={true}
                    />
                  ) : selectedExperience.image ? (
                    <img 
                      src={selectedExperience.image}
                      alt={selectedExperience.company}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full bg-linear-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center">
                      <Briefcase className="w-16 h-16 text-primary/40 mb-4" />
                    </div>
                  )}

                  {/* Overlay Text - Always Visible if image/images exist */}
                  {(selectedExperience.image || (selectedExperience.images && selectedExperience.images.length > 0)) && (
                    <>
                      <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent z-10 pointer-events-none" />
                      <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-3 bg-primary/20 backdrop-blur-md rounded-xl border border-white/10">
                            <Briefcase className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-foreground tracking-tight drop-shadow-md">{selectedExperience.company}</h2>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{selectedExperience.location || 'Remote'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Fallback text for no image */}
                  {(!selectedExperience.image && (!selectedExperience.images || selectedExperience.images.length === 0)) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                      <h2 className="text-2xl font-bold text-primary/80">{selectedExperience.company}</h2>
                      <div className="flex items-center gap-2 text-muted-foreground mt-2">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedExperience.location || 'Remote'}</span>
                      </div>
                    </div>
                  )}
                  <DialogClose className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors">
                    <X className="w-5 h-5" />
                  </DialogClose>
                </div>

                {/* Content */}
                <div className="p-8 pt-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-1">{selectedExperience.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(selectedExperience.startDate)} - {selectedExperience.current ? 'Present' : formatDate(selectedExperience.endDate!)}
                        </span>
                      </div>
                    </div>
                    {selectedExperience.current && (
                      <Badge className="self-start md:self-center px-4 py-1.5 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        Currently Working Here
                      </Badge>
                    )}
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-primary rounded-full" />
                      Role Description
                    </h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
                      {selectedExperience.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
