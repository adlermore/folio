'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { clients } from '@/lib/data'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const doubled = [...clients, ...clients]

export function ClientsSection() {
  const t = useTranslations('clients')

  return (
    <section className="py-20 bg-bg border-y border-border overflow-hidden">
      <ScrollReveal className="mb-10 px-8 md:px-12">
        <span className="label-sm text-text-dim">{t('trusted_by')}</span>
      </ScrollReveal>

      <div className="relative flex">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
        <motion.div className="flex items-center gap-16 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}>
          {doubled.map((client, i) => (
            <div key={`${client.name}-${i}`} className="flex items-center gap-16 flex-shrink-0">
              <span className="font-display text-2xl font-light text-text-dim hover:text-gold transition-colors duration-300 cursor-default">
                {client.name}
              </span>
              <span className="w-1 h-1 rounded-full bg-gold-dim flex-shrink-0" aria-hidden="true" />
            </div>
          ))}
        </motion.div>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
