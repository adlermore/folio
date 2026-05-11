'use client'

import { useTranslations } from 'next-intl'

import { GoldLine } from '@/components/ui/GoldLine'

export function Footer() {
  const t    = useTranslations('footer')
  const tNav = useTranslations('nav')
  const year = new Date().getFullYear()

  const navLinks = [
    { label: tNav('work'),     href: '#work' as const },
    { label: tNav('services'), href: '#services' as const },
    { label: tNav('about'),    href: '#about' as const },
    { label: 'Process',        href: '#process' as const },
    { label: tNav('contact'),  href: '#contact' as const },
  ]

  return (
    <footer className="bg-surface border-t border-border px-8 md:px-12 pt-16 pb-10">
      <GoldLine className="mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div>
          <span className="font-display text-3xl font-light tracking-[0.12em] text-text-primary block mb-4">FOLIO</span>
          <p className="text-text-muted text-sm leading-relaxed max-w-xs">{t('description')}</p>
        </div>
        <div>
          <p className="label-sm text-text-dim mb-6">{t('nav_title')}</p>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="text-text-muted hover:text-gold text-sm transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="label-sm text-text-dim mb-6">{t('contact_title')}</p>
          <a href="mailto:hello@foliostudio.co"
            className="text-text-primary hover:text-gold transition-colors duration-300 text-sm block mb-2">
            hello@foliostudio.co
          </a>
          <p className="text-text-muted text-sm">{t('location')}</p>
          <div className="flex gap-4 mt-6">
            {['Instagram', 'LinkedIn', 'Behance'].map((platform) => (
              <a key={platform} href="#"
                className="label-sm text-text-dim hover:text-gold transition-colors duration-300">
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-border">
        <p className="label-sm text-text-dim">&copy; {year} FOLIO Studio. {t('rights')}</p>
        <p className="label-sm text-text-dim">{t('tagline')}</p>
      </div>
    </footer>
  )
}
