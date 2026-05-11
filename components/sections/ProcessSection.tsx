'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GoldLine } from '@/components/ui/GoldLine'

const STEP_NUMS = ['01', '02', '03', '04'] as const

export function ProcessSection() {
  const t = useTranslations('process')

  return (
    <section id="process" className="py-section px-8 md:px-12 bg-surface">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <ScrollReveal>
            <span className="label-sm text-gold block mb-4">{t('label')}</span>
            <h2 className="heading-xl text-text-primary">
              {t('heading')}<br />
              <em className="font-light not-italic text-text-muted">{t('heading_em')}</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="md:max-w-xs">
            <p className="text-text-muted text-sm leading-relaxed">{t('sub')}</p>
          </ScrollReveal>
        </div>

        <div className="relative">
          <TimelineLine />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {STEP_NUMS.map((num, i) => (
              <ProcessStep key={num} num={num} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineLine() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <div ref={ref} className="absolute left-0 top-0 bottom-0 w-px hidden md:block ml-6">
      <motion.div className="w-full bg-gradient-to-b from-gold via-gold-dim to-transparent"
        initial={{ height: '0%' }}
        animate={inView ? { height: '100%' } : { height: '0%' }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} />
    </div>
  )
}

function ProcessStep({ num, index }: { num: typeof STEP_NUMS[number]; index: number }) {
  const t      = useTranslations('process')
  const isRight = index % 2 === 1
  return (
    <ScrollReveal delay={index * 0.1} direction={isRight ? 'right' : 'left'}
      className={`relative border-b border-border p-8 md:p-10 ${isRight ? 'md:border-l' : 'md:border-r'}`}>
      <span className="font-display text-7xl font-light text-text-dim/30 leading-none block mb-6 select-none">
        {num}
      </span>
      <GoldLine className="mb-6 w-12" delay={index * 0.1 + 0.2} />
      <h3 className="font-display text-3xl font-light text-text-primary mb-4">{t(`${num}_title`)}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{t(`${num}_desc`)}</p>
    </ScrollReveal>
  )
}
