'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GoldLine } from '@/components/ui/GoldLine'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function AboutSection() {
  const t   = useTranslations('about')
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const stats = [
    { num: t('stat_1_num'), label: t('stat_1_label') },
    { num: t('stat_2_num'), label: t('stat_2_label') },
    { num: t('stat_3_num'), label: t('stat_3_label') },
    { num: t('stat_4_num'), label: t('stat_4_label') },
  ]

  return (
    <section ref={ref} id="about" className="py-section px-8 md:px-12 bg-surface overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          <ScrollReveal direction="left" className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt={t('image_alt')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
              </motion.div>
            </div>
            <motion.div
              className="absolute bottom-8 -right-4 md:-right-8 bg-bg border border-border p-6 max-w-[220px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <p className="font-display text-4xl font-light text-gold leading-none mb-2">{t('projects_count')}</p>
              <p className="label-sm text-text-dim">{t('projects_label')}</p>
              <GoldLine className="mt-4" width="40px" delay={0.6} />
            </motion.div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <span className="label-sm text-gold block mb-6">{t('label')}</span>
            </ScrollReveal>
            <div className="overflow-hidden mb-8">
              <h2 className="heading-xl text-text-primary">
                <AnimatedText text={t('heading_1')} splitBy="word" delay={0.1} stagger={0.12} />
                <br />
                <AnimatedText text={t('heading_2')} splitBy="word" delay={0.35} stagger={0.08} />
              </h2>
            </div>
            <ScrollReveal delay={0.2}>
              <p className="text-text-muted leading-relaxed mb-6">{t('body_1')}</p>
              <p className="text-text-muted leading-relaxed mb-10">{t('body_2')}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <GoldLine className="mb-10" />
              <div className="grid grid-cols-2 gap-8">
                {stats.map(({ num, label }) => (
                  <div key={label}>
                    <p className="font-display text-4xl font-light text-text-primary leading-none mb-1">{num}</p>
                    <p className="label-sm text-text-dim">{label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
