'use client'

import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
}

// TiltCard disabled - just a simple wrapper now
export function TiltCard({ children, className }: TiltCardProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
    </div>
  )
}