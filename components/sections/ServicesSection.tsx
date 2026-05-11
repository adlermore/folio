'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GoldLine } from '@/components/ui/GoldLine'

const SERVICE_NUMBERS = ['01', '02', '03', '04', '05'] as const
type ServiceNum = typeof SERVICE_NUMBERS[number]

export function ServicesSection() {
  const t = useTranslations('services')

  return (
    <section id="services" className="py-section px-8 md:px-12 bg-bg">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <ScrollReveal>
            <span className="label-sm text-gold block mb-4">{t('label')}</span>
            <h2 className="heading-xl text-text-primary">
              {t('heading')}<br />
              <em className="font-light not-italic text-text-muted">{t('heading_em')}</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="hidden md:block max-w-xs text-right">
            <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line">{t('sub')}</p>
          </ScrollReveal>
        </div>

        <GoldLine className="mb-4" />

        <div>
          {SERVICE_NUMBERS.map((num, i) => (
            <ServiceRow key={num} num={num} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceRowProps {
  num: ServiceNum
  index: number
}

function ServiceRow({ num, index }: ServiceRowProps) {
  const t = useTranslations('services')
  const [hovered, setHovered] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 150, damping: 18 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 18 })

  const tags = t.raw(`${num}_tags`) as string[]

  return (
    <ScrollReveal delay={index * 0.07}>
      <motion.div
        className="relative group border-b border-border overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          cursorX.set(e.clientX - rect.left)
          cursorY.set(e.clientY - rect.top)
        }}
        animate={{ borderColor: hovered ? '#C9A84C' : '#1E1E1E' }}
        transition={{ duration: 0.4 }}
      >
        <motion.div className="absolute inset-0 bg-surface-2 pointer-events-none"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />

        <motion.div
          className="absolute pointer-events-none w-10 h-10 rounded-full border border-gold -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: springX, top: springY }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 md:py-10 z-10">
          <div className="flex items-center gap-6 md:gap-10">
            <motion.span className="font-display text-5xl font-light leading-none tabular-nums"
              animate={{ color: hovered ? '#C9A84C' : '#3A3A3A' }}
              transition={{ duration: 0.35 }}>
              {num}
            </motion.span>
            <motion.h3 className="heading-lg text-text-primary"
              animate={{ x: hovered ? 8 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              {t(`${num}_title`)}
            </motion.h3>
          </div>

          <motion.div className="md:max-w-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-text-muted text-sm leading-relaxed mb-3">{t(`${num}_desc`)}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="label-sm text-text-dim border border-border px-2 py-1">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center justify-center w-10 h-10 border border-border rounded-full flex-shrink-0"
            animate={{ borderColor: hovered ? '#C9A84C' : '#1E1E1E', rotate: hovered ? -45 : 0 }}
            transition={{ duration: 0.35 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 3l5 4-5 4"
                stroke={hovered ? '#C9A84C' : '#6B6B6B'}
                strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}
