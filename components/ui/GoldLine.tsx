'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface GoldLineProps {
  className?: string
  delay?: number
  width?: string
}

export function GoldLine({ className, delay = 0, width = '100%' }: GoldLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <div ref={ref} className={`relative h-px overflow-hidden ${className ?? ''}`} style={{ width }}>
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-transparent"
        style={{ width: '100%' }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
