'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  splitBy?: 'char' | 'word'
  once?: boolean
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  splitBy = 'char',
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once, margin: '-60px 0px' })

  const items = splitBy === 'char'
    ? text.split('')
    : text.split(' ')

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className ?? ''}`} aria-label={text}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="inline-block"
          aria-hidden="true"
          initial={{ y: '110%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {item === ' ' ? '\u00A0' : item}
          {splitBy === 'word' && i < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}
