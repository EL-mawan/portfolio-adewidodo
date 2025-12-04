'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Code } from 'lucide-react'
import { SkillProgress } from '@/components/ui/skill-progress'

interface Skill {
  id: string
  name: string
  category: string
  level: number
  order: number
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSkills(data)
        }
      })
      .catch(console.error)
  }, [])

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categories = Object.keys(skillsByCategory)

  return (
    <section id="skills" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
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
            Technical <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My technical expertise and proficiency levels across different domains
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skillsByCategory[category]

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              >
                {/* Category Header */}
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold">{category}</h3>
                  <p className="text-muted-foreground">
                    {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: categoryIndex * 0.2 + skillIndex * 0.1 
                      }}
                    >
                      <SkillProgress
                        name={skill.name}
                        level={skill.level}
                        category={skill.category}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {skills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <Code className="w-12 h-12 text-primary/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Skills Added Yet</h3>
            <p className="text-muted-foreground">
              Technical skills will be showcased here soon.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
