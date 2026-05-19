import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import '@/app/globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LIGHT — Design & Print Studio',
    template: '%s | LIGHT DESIGN Studio',
  },
  description:
    'LIGHT DESIGN Studio crafts brand identities, editorial systems, and print productions for brands that demand precision.',
  keywords: ['design studio', 'print studio', 'brand identity', 'editorial design', 'packaging design', 'London'],
  authors: [{ name: 'LIGHT DESIGN Studio' }],
  openGraph: {
    type: 'website',
    title: 'LIGHT — Design & Print Studio',
    description: 'Crafting visual systems for brands that demand precision.',
    siteName: 'LIGHT DESIGN Studio',
  },
}

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
}

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="grain bg-bg text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
