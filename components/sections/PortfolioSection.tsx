'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { projects } from '@/lib/data'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Project } from '@/types'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function PortfolioSection() {
  const t            = useTranslations('portfolio')
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Project | null>(null)

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return
    const totalW = trackRef.current.scrollWidth - window.innerWidth
    gsap.to(trackRef.current, {
      x: -totalW, ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalW}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
  }, { scope: containerRef })

  return (
    <>
      <div className="px-8 md:px-12 pt-section pb-16 bg-bg max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between">
          <ScrollReveal>
            <span className="label-sm text-gold block mb-4">{t('label')}</span>
            <h2 className="heading-xl text-text-primary">
              {t('heading')}<br />
              <em className="font-light not-italic text-text-muted">{t('heading_em')}</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="hidden md:block">
            <p className="label-sm text-text-dim text-right">
              {String(projects.length).padStart(2, '0')} projects<br />2023 – 2024
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div ref={containerRef} className="relative bg-bg overflow-hidden" id="work">
        <div ref={trackRef} className="flex items-stretch h-screen gap-4 pl-8 md:pl-12 pr-[10vw] will-change-transform">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onExpand={() => setActive(project)} />
          ))}
        </div>
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <motion.div className="w-10 h-px bg-gold"
            animate={{ scaleX: [1, 0.3, 1], originX: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <span className="label-sm text-text-dim">{t('scroll_hint')}</span>
          <motion.div className="w-10 h-px bg-gold"
            animate={{ scaleX: [1, 0.3, 1], originX: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <ProjectLightbox project={active} onClose={() => setActive(null)} closeLabel={t('close')} />}
      </AnimatePresence>
    </>
  )
}

function ProjectCard({ project, index, onExpand }: { project: Project; index: number; onExpand: () => void }) {
  const [hovered, setHovered] = useState(false)
  const isWide = index % 3 === 0

  return (
    <motion.article
      className={`relative flex-shrink-0 ${isWide ? 'w-[55vw]' : 'w-[38vw]'} h-[70vh] my-auto overflow-hidden cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onExpand}
      whileTap={{ scale: 0.99 }}
    >
      <motion.div className="absolute inset-0"
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <Image src={project.image} alt={project.title} fill className="object-cover" sizes="55vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
      <motion.div className="absolute inset-0 bg-bg/50"
        animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }} />
      <motion.div className="absolute top-0 left-0 right-0 h-px bg-gold"
        animate={{ scaleX: hovered ? 1 : 0, originX: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />

      <div className="absolute top-6 right-6">
        <span className="font-display text-6xl font-light text-white/10">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <motion.div animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }} className="mb-3">
          <span className="label-sm text-gold capitalize">{project.category}</span>
        </motion.div>
        <h3 className="font-display text-3xl md:text-4xl font-light text-text-primary mb-1 leading-tight">
          {project.title}
        </h3>
        <motion.div className="flex items-center justify-between"
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}>
          <p className="label-sm text-text-muted">{project.client}</p>
          <span className="label-sm text-text-dim">{project.year}</span>
        </motion.div>
      </div>
    </motion.article>
  )
}

function ProjectLightbox({ project, onClose, closeLabel }: { project: Project; onClose: () => void; closeLabel: string }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-sm flex items-center justify-center p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden"
        initial={{ scale: 0.95, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 24 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={project.image} alt={project.title} fill className="object-cover" sizes="90vw" />
        </div>
        <div className="bg-surface border border-border p-6 md:p-8 flex items-start justify-between gap-6">
          <div>
            <span className="label-sm text-gold capitalize block mb-2">{project.category}</span>
            <h3 className="font-display text-3xl font-light text-text-primary">{project.title}</h3>
            <p className="text-text-muted mt-1">{project.client} — {project.year}</p>
          </div>
          <button onClick={onClose}
            className="flex-shrink-0 w-10 h-10 border border-border flex items-center justify-center text-text-muted hover:text-gold hover:border-gold transition-colors duration-300"
            aria-label={closeLabel}>
            ✕
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
