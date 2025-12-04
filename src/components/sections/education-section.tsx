'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react'
import { TiltCard } from '@/components/ui/tilt-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Education {
  id: string
  degree: string
  institution: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  gpa?: string
  description?: string
  order: number
}

export function EducationSection() {
  const [education, setEducation] = useState<Education[]>([])

  useEffect(() => {
    fetch('/api/education')
      .then(res => res.json())
      .then(data => setEducation(data))
      .catch(console.error)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  return (
    <section id="education" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-muted/5">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic background and educational journey
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-linear-to-b from-primary via-primary/50 to-transparent" />

          {/* Education Cards */}
          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
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
                    <Card className="border-0 shadow-xl bg-linear-to-br from-background via-background to-muted/10 hover:shadow-2xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground mb-1">
                              {edu.degree}
                            </h3>
                            <div className="flex items-center gap-2 text-primary font-medium">
                              <GraduationCap className="w-4 h-4" />
                              {edu.institution}
                            </div>
                          </div>
                          {edu.current && (
                            <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                              Current
                            </Badge>
                          )}
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate!)}
                            </span>
                          </div>
                          {edu.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{edu.location}</span>
                            </div>
                          )}
                          {edu.gpa && (
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              <span>GPA: {edu.gpa}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        {edu.description && (
                          <p className="text-muted-foreground leading-relaxed">
                            {edu.description}
                          </p>
                        )}

                        {/* Hover Effect Border */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </CardContent>
                    </Card>
                  </TiltCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {education.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-primary/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Education Records Yet</h3>
            <p className="text-muted-foreground">
              Educational background will be added here soon.
            </p>
          </motion.div>
        )}


      </div>
    </section>
  )
}
