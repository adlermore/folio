'use client'

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, Link } from '@/lib/navigation'
import { useParams } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { MagneticButton } from '@/components/ui/MagneticButton'

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  am: 'ՀԱՅ',
}

export function Navigation() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [langOpen, setLangOpen]   = useState(false)
  const { scrollY }               = useScroll()
  const pathname                  = usePathname()
  const router                    = useRouter()
  const params                    = useParams()
  const currentLocale             = (params.locale as Locale) ?? 'en'

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  function switchLocale(locale: Locale) {
    router.replace(pathname, { locale })
    setLangOpen(false)
    setMenuOpen(false)
  }

  const navLinks = [
    { label: t('work'),     href: '#work' as const },
    { label: t('services'), href: '#services' as const },
    { label: t('about'),    href: '#about' as const },
    { label: t('contact'),  href: '#contact' as const },
  ]

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 transition-all duration-700"
        animate={{
          backgroundColor: scrolled ? 'rgba(8,8,8,0.92)' : 'rgba(8,8,8,0)',
          backdropFilter:   scrolled ? 'blur(12px)' : 'blur(0px)',
          borderBottom:     scrolled ? '1px solid #1E1E1E' : '1px solid transparent',
          height:           scrolled ? '72px' : '88px',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-2xl font-light tracking-[0.12em] text-text-primary">
              LIGHT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <motion.nav
          className="hidden md:flex items-center gap-10"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-sm text-text-muted hover:text-gold transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500 ease-expo-out" />
            </a>
          ))}

          {/* Language switcher */}
          <LocaleSwitcher
            currentLocale={currentLocale}
            langOpen={langOpen}
            setLangOpen={setLangOpen}
            switchLocale={switchLocale}
          />

          <MagneticButton>
            <a href="#contact" className="btn-primary text-xs py-3 px-6">
              {t('cta')}
            </a>
          </MagneticButton>
        </motion.nav>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-4">
          <LocaleSwitcher
            currentLocale={currentLocale}
            langOpen={langOpen}
            setLangOpen={setLangOpen}
            switchLocale={switchLocale}
          />
          <button
            className="flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span className="block w-6 h-px bg-text-primary"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }} />
            <motion.span className="block w-4 h-px bg-gold"
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }} />
            <motion.span className="block w-6 h-px bg-text-primary"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }} />
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-bg flex flex-col justify-center px-8 md:hidden"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={menuOpen ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <motion.div key={link.href}
              initial={{ opacity: 0, x: -24 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.5, delay: menuOpen ? 0.1 + i * 0.07 : 0 }}
            >
              <a href={link.href}
                className="heading-lg text-text-primary hover:text-gold transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }}
            animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a href="#contact" className="btn-primary inline-flex mt-4"
              onClick={() => setMenuOpen(false)}>
              {t('cta')}
            </a>
          </motion.div>
        </nav>
      </motion.div>
    </>
  )
}

interface LocaleSwitcherProps {
  currentLocale: Locale
  langOpen: boolean
  setLangOpen: (v: boolean) => void
  switchLocale: (l: Locale) => void
}

function LocaleSwitcher({ currentLocale, langOpen, setLangOpen, switchLocale }: LocaleSwitcherProps) {
  return (
    <div className="relative">
      <button
        onClick={() => setLangOpen(!langOpen)}
        className="label-sm text-text-muted hover:text-gold transition-colors duration-300 flex items-center gap-1.5"
      >
        {LOCALE_LABELS[currentLocale]}
        <motion.svg
          width="8" height="8" viewBox="0 0 8 8" fill="none"
          animate={{ rotate: langOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <path d="M1 2.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <motion.div
        className="absolute top-full right-0 mt-3 bg-surface border border-border min-w-[80px] overflow-hidden"
        initial={{ opacity: 0, y: -6, scaleY: 0.9 }}
        animate={langOpen ? { opacity: 1, y: 0, scaleY: 1 } : { opacity: 0, y: -6, scaleY: 0.9 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top' }}
        onMouseLeave={() => setLangOpen(false)}
      >
        {routing.locales.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLocale(locale)}
            className={`w-full text-left px-4 py-2.5 label-sm transition-colors duration-200
              ${locale === currentLocale
                ? 'text-gold bg-surface-2'
                : 'text-text-muted hover:text-gold hover:bg-surface-2'
              }`}
          >
            {LOCALE_LABELS[locale]}
          </button>
        ))}
      </motion.div>
    </div>
  )
}
