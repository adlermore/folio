'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useSplineScene } from '@/lib/spline/useSplineScene'

const SplineBackground = dynamic(
  () => import('./SplineBackground').then((m) => m.SplineBackground),
  { ssr: false }
)

const LIGHT_LETTERS = ['L', 'I', 'G', 'H', 'T']

export function Hero() {
  const t      = useTranslations('hero')
  const ref    = useRef<HTMLElement>(null)
  const spline = useSplineScene()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen flex flex-col justify-end overflow-hidden bg-bg" id="hero">
      <SplineBackground spline={spline} />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 60%)' }}
      />

      <motion.div className="absolute top-32 right-8 md:right-12"
        initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}>
        <span className="label-sm text-text-dim">{t('est')}</span>
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative pb-20 md:pb-24 px-8 md:px-12">
        <motion.div className="flex items-center gap-4 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          <span className="w-8 h-px bg-gold" />
          <span className="label-sm text-gold">{t('label')}</span>
        </motion.div>

        <h1 className="heading-display text-text-primary mb-0 overflow-hidden" aria-label="LIGHT">
          {LIGHT_LETTERS.map((letter, i) => (
            <motion.span key={i} className="inline-block" aria-hidden="true"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
              {letter}
            </motion.span>
          ))}
        </h1>

        <div className="relative h-px w-full my-6 overflow-hidden">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-dim to-transparent"
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }} />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-0">
          <motion.p className="text-text-muted text-body-lg max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}>
            {t('tagline')}
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}>
            <MagneticButton>
              <a href="#work" className="btn-primary">
                {t('cta_primary')}
                <ArrowRight />
              </a>
            </MagneticButton>
            <a href="#contact" className="label-sm text-text-muted hover:text-gold transition-colors duration-300">
              {t('cta_secondary')}
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2.0 }}>
        <span className="label-sm text-text-dim">{t('scroll')}</span>
        <motion.div className="w-px h-10 bg-gradient-to-b from-gold to-transparent"
          animate={{ scaleY: [1, 0.4, 1], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.div>

      <motion.div className="absolute bottom-8 right-8 md:right-12 flex gap-8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.9 }}>
        {([
          { num: '120+', key: 'stat_projects' },
          { num: '8',    key: 'stat_years' },
          { num: '40+',  key: 'stat_clients' },
        ] as const).map(({ num, key }) => (
          <div key={key} className="text-right">
            <p className="font-display text-2xl font-light text-gold leading-none">{num}</p>
            <p className="label-sm text-text-dim mt-1">{t(key)}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
