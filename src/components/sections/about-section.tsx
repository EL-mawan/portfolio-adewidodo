'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { User, Award } from 'lucide-react'
import { TiltCard } from '@/components/ui/tilt-card'
import { Card, CardContent } from '@/components/ui/card'
import { useAutoRefresh } from '@/contexts/realtime-context'

interface AboutContent {
  fullName: string
  profession: string
  bio: string
  story: string
  profileImage: string | null
}

export function AboutSection() {
  const [content, setContent] = useState<AboutContent>({
    fullName: 'Ade Widodo',
    profession: 'Full Stack Developer & UI/UX Designer',
    bio: 'Passionate developer with expertise in modern web technologies and a keen eye for design.',
    story: 'I started my journey in web development over 5 years ago, and since then, I have been honing my skills in creating beautiful, functional, and user-friendly applications.',
    profileImage: null
  })

  const fetchData = () => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(console.error)
  }

  // Auto-refresh when data changes in admin panel
  useAutoRefresh(fetchData)

  return (
    <section id="about" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-muted/5">
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
            About <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my journey, skills, and what drives me
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TiltCard>
              <Card className="overflow-hidden border-0 shadow-2xl bg-linear-to-br from-background via-background to-muted/20">
                <CardContent className="p-8">
                  {/* Profile Image */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden bg-linear-to-br from-primary/20 to-primary/5 p-1">
                      <div className="w-full h-full rounded-full bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                        {content.profileImage ? (
                          <img 
                            src={content.profileImage} 
                            alt={content.fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-20 h-20 text-primary" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Name and Profession */}
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold mb-2">{content.fullName}</h3>
                    <p className="text-lg text-muted-foreground">{content.profession}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground leading-relaxed text-center">
                    {content.bio}
                  </p>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <TiltCard>
              <Card className="border-0 shadow-xl bg-linear-to-br from-background via-background to-muted/10 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">My Story</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {content.story}
                  </p>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>
        </div>


      </div>
    </section>
  )
}
