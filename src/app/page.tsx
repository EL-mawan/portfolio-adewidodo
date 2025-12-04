'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Download, Mail } from 'lucide-react'
import { TiltCard } from '@/components/ui/tilt-card'
import { Button } from '@/components/ui/button'
import { AboutSection } from '@/components/sections/about-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { CertificationSection } from '@/components/sections/certification-section'
import { SkillsSection } from '@/components/sections/skills-section'
import { EducationSection } from '@/components/sections/education-section'
import { ContactSection } from '@/components/sections/contact-section'
import { GallerySection } from '@/components/sections/gallery-section'
import { useAutoRefresh } from '@/contexts/realtime-context'

interface HomepageContent {
  heroTitle: string
  heroSubtitle: string
  cvUrl?: string | null
}

export default function Home() {
  const [content, setContent] = useState<HomepageContent>({
    heroTitle: 'Ade Widodo',
    heroSubtitle: 'Full Stack Developer & UI/UX Designer',
    cvUrl: null
  })

  const [floatingElements, setFloatingElements] = useState<{ left: string; top: string }[]>([])

  useEffect(() => {
    setFloatingElements(
      [...Array(6)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    )
  }, [])

  const fetchHomepage = () => {
    fetch('/api/homepage')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(console.error)
  }

  // Auto-refresh when admin updates homepage content
  useAutoRefresh(fetchHomepage)

  // Smooth scroll handler for internal links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5 -z-10" />
      
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {floatingElements.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: pos.left,
              top: pos.top,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4"
            >
              <span className="text-sm md:text-base text-muted-foreground font-medium">
                Hello, I'm
              </span>
            </motion.div>

            {/* Main Title */}
            <TiltCard className="mb-6">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
              >
                {content.heroTitle}
              </motion.h1>
            </TiltCard>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-3xl mx-auto">
                {content.heroSubtitle}
              </h2>
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Send Message Button */}
              <TiltCard>
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-base group relative overflow-hidden"
                  asChild
                >
                  <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>
                    <span className="relative z-10 flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Send message
                    </span>
                  </a>
                </Button>
              </TiltCard>

              {/* Download CV Button */}
              <TiltCard>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="px-8 py-3 text-base border-2 group"
                  asChild={!!content.cvUrl}
                  onClick={!content.cvUrl ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                >
                  {content.cvUrl ? (
                    <a href={content.cvUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download CV
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                      <Download className="w-5 h-5" />
                      Download CV
                    </span>
                  )}
                </Button>
              </TiltCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <AboutSection />
      <ExperienceSection />
      <CertificationSection />
      <EducationSection />
      <SkillsSection />
      <GallerySection />
      <ContactSection />
    </div>
  )
}