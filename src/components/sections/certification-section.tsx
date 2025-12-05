'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Award, Calendar, ExternalLink, Eye } from 'lucide-react'
import { TiltCard } from '@/components/ui/tilt-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAutoRefresh } from '@/contexts/realtime-context'
import { ImageCarousel } from '@/components/ui/image-carousel'

interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  image?: string
  images?: string[]
  description?: string
  order: number
}

export function CertificationSection() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchData = () => {
    fetch('/api/certification')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCertifications(data)
        }
      })
      .catch(err => {
        console.error('Error fetching certifications:', err)
        setCertifications([])
      })
  }

  // Auto-refresh when data changes in admin panel
  useAutoRefresh(fetchData)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const openModal = (cert: Certification) => {
    setSelectedCert(cert)
    setIsModalOpen(true)
  }

  return (
    <section id="certification" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-muted/5">
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
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and credentials that validate my expertise
          </p>
        </motion.div>

        {/* Certifications Grid with Scroll */}
        <div className={`
          ${certifications.length > 6 ? 'max-h-[800px] overflow-y-auto pr-2 md:pr-4 -mr-2 md:-mr-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40 transition-colors' : ''}
        `}>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {certifications.map((cert, index) => (
              <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="group relative overflow-hidden h-[250px] md:h-[350px] border-0 shadow-lg cursor-pointer"
                onClick={() => openModal(cert)}
              >
                {/* Full Background Image */}
                {cert.images && cert.images.length > 0 ? (
                  <ImageCarousel
                    images={cert.images}
                    alt={cert.title}
                    autoSlideInterval={3000}
                    showControls={false}
                    showIndicators={true}
                    className="absolute inset-0"
                  />
                ) : cert.image ? (
                  <div className="absolute inset-0">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-primary/80 to-primary/40 flex items-center justify-center">
                    <Award className="w-16 h-16 md:w-24 md:h-24 text-white/30" />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                    {cert.expiryDate ? (
                      new Date(cert.expiryDate) > new Date() ? (
                        <Badge className="bg-green-500/20 text-green-100 border-green-500/30 backdrop-blur-md hover:bg-green-500/30 text-[10px] md:text-xs px-1.5 py-0.5 md:px-2.5 md:py-0.5">
                          Valid
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-100 border-red-500/30 backdrop-blur-md hover:bg-red-500/30 text-[10px] md:text-xs px-1.5 py-0.5 md:px-2.5 md:py-0.5">
                          Expired
                        </Badge>
                      )
                    ) : (
                      <Badge className="bg-blue-500/20 text-blue-100 border-blue-500/30 backdrop-blur-md hover:bg-blue-500/30 text-[10px] md:text-xs px-1.5 py-0.5 md:px-2.5 md:py-0.5">
                        No Expiry
                      </Badge>
                    )}
                </div>

                {/* Content Overlay with Blur */}
                <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-4">
                  <div className="backdrop-blur-md bg-black/30 rounded-xl p-3 md:p-5 border border-white/10 text-white space-y-1 md:space-y-3 transform transition-all duration-300 hover:bg-black/40">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm md:text-xl leading-tight line-clamp-2 text-white">{cert.title}</h3>
                        <div className="text-white/90 font-medium text-xs md:text-base mt-0.5 md:mt-1 truncate">{cert.issuer}</div>
                      </div>
                      {cert.credentialUrl && (
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer');
                          }}
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors shrink-0 cursor-pointer"
                          title="Verify Credential"
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/80 pt-2 border-t border-white/10">
                      <span className="flex items-center gap-1.5">
                        📅 {new Date(cert.issueDate).toLocaleDateString()}
                      </span>
                      {cert.expiryDate && (
                        <span className="flex items-center gap-1.5">
                          ⏳ Exp: {new Date(cert.expiryDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          </div>
        </div>

        {/* Empty State */}
        {certifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <Award className="w-12 h-12 text-primary/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Certifications Yet</h3>
            <p className="text-muted-foreground">
              Professional certifications will be showcased here soon.
            </p>
          </motion.div>
        )}

        {/* Modal for Certificate Preview */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                {selectedCert?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedCert && (
              <div className="space-y-6">
                {/* Certificate Image */}
                {selectedCert.images && selectedCert.images.length > 0 ? (
                  <div className="relative rounded-lg overflow-hidden bg-muted/20">
                    <div className="h-[400px]">
                      <ImageCarousel
                        images={selectedCert.images}
                        alt={selectedCert.title}
                        autoSlideInterval={4000}
                        showControls={true}
                        showIndicators={true}
                      />
                    </div>
                  </div>
                ) : selectedCert.image && (
                  <div className="relative rounded-lg overflow-hidden bg-muted/20 p-4">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>
                )}

                {/* Certificate Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Issuer</h4>
                    <p className="text-muted-foreground">{selectedCert.issuer}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Issue Date</h4>
                    <p className="text-muted-foreground">{formatDate(selectedCert.issueDate)}</p>
                  </div>

                  {selectedCert.expiryDate && (
                    <div>
                      <h4 className="font-semibold mb-2">Expiry Date</h4>
                      <p className="text-muted-foreground">{formatDate(selectedCert.expiryDate)}</p>
                    </div>
                  )}

                  {selectedCert.credentialId && (
                    <div>
                      <h4 className="font-semibold mb-2">Credential ID</h4>
                      <p className="text-muted-foreground font-mono">{selectedCert.credentialId}</p>
                    </div>
                  )}
                </div>

                {selectedCert.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedCert.description}</p>
                  </div>
                )}

                {selectedCert.credentialUrl && (
                  <div className="pt-4">
                    <Button asChild className="w-full">
                      <a
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Credential
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
