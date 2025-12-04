'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SkillProgressProps {
  name: string
  level: number
  category: string
  className?: string
}

export function SkillProgress({ name, level, category, className }: SkillProgressProps) {
  const [isHovered, setIsHovered] = useState(false)

  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDashoffset = circumference - (level / 100) * circumference

  return (
    <motion.div
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        className
      )}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Background */}
      <div className="relative w-full h-full p-6 rounded-2xl bg-gradient-to-br from-background via-background to-muted/10 border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300">
        
        {/* Circular Progress */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-primary"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-2xl font-bold text-primary"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {level}%
            </motion.span>
          </div>
        </div>

        {/* Skill Name */}
        <h3 className="text-lg font-semibold text-center mb-1">{name}</h3>
        
        {/* Category */}
        <p className="text-sm text-muted-foreground text-center">{category}</p>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* 3D depth effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/5 transform translate-z-[-1px]" />
      </div>
    </motion.div>
  )
}