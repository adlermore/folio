'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GoldLine } from '@/components/ui/GoldLine'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { ContactFormValues } from '@/types'

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(20),
})

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactSection() {
  const t      = useTranslations('contact')
  const [status, setStatus] = useState<Status>('idle')

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ContactFormValues>({ resolver: zodResolver(schema) })

  const serviceOptions = t.raw('services') as string[]

  async function onSubmit(data: ContactFormValues) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-section px-8 md:px-12 bg-bg">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-16 md:mb-20">
          <ScrollReveal>
            <span className="label-sm text-gold block mb-4">{t('label')}</span>
          </ScrollReveal>
          <div className="overflow-hidden">
            <motion.h2 className="heading-xl text-text-primary"
              initial={{ y: '100%' }} whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              {t('heading_1')}<br />
              <span className="text-text-muted font-light italic">{t('heading_2')}</span>
            </motion.h2>
          </div>
        </div>

        <GoldLine className="mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <ScrollReveal direction="left">
            <div className="space-y-10">
              {[
                { label: t('email_label'),    content: <a href="mailto:hello@foliostudio.co" className="font-display text-2xl font-light text-text-primary hover:text-gold transition-colors duration-300">hello@foliostudio.co</a> },
                { label: t('location_label'), content: <p className="text-text-muted whitespace-pre-line">{t('location_value')}</p> },
                { label: t('hours_label'),    content: <p className="text-text-muted whitespace-pre-line">{t('hours_value')}</p> },
              ].map(({ label, content }) => (
                <div key={label}>
                  <p className="label-sm text-text-dim mb-3">{label}</p>
                  {content}
                </div>
              ))}
              <div>
                <p className="label-sm text-text-dim mb-4">{t('follow_label')}</p>
                <div className="flex gap-6">
                  {['Instagram', 'LinkedIn', 'Behance'].map((s) => (
                    <a key={s} href="#" className="label-sm text-text-muted hover:text-gold transition-colors duration-300">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-start justify-center h-full gap-6">
                  <span className="text-gold font-display text-5xl font-light">{t('success_heading')}</span>
                  <GoldLine width="80px" />
                  <p className="text-text-muted leading-relaxed">{t('success_body')}</p>
                  <button onClick={() => setStatus('idle')}
                    className="label-sm text-text-dim hover:text-gold transition-colors duration-300 mt-2">
                    {t('success_reset')}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField label={t('form_name')} error={errors.name?.message}>
                      <input {...register('name')} placeholder={t('form_name_placeholder')} className="form-input" />
                    </FormField>
                    <FormField label={t('form_email')} error={errors.email?.message}>
                      <input {...register('email')} type="email" placeholder={t('form_email_placeholder')} className="form-input" />
                    </FormField>
                  </div>

                  <FormField label={t('form_company')}>
                    <input {...register('company')} placeholder={t('form_company_placeholder')} className="form-input" />
                  </FormField>

                  <FormField label={t('form_service')} error={errors.service?.message}>
                    <select {...register('service')} className="form-input" defaultValue="">
                      <option value="" disabled>{t('form_service_placeholder')}</option>
                      {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FormField>

                  <FormField label={t('form_message')} error={errors.message?.message}>
                    <textarea {...register('message')} rows={5}
                      placeholder={t('form_message_placeholder')} className="form-input resize-none" />
                  </FormField>

                  {status === 'error' && (
                    <p className="label-sm text-red-400">{t('form_error')}</p>
                  )}

                  <MagneticButton>
                    <button type="submit" disabled={status === 'loading'}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                      {status === 'loading' ? t('form_sending') : t('form_submit')}
                      {status !== 'loading' && <ArrowRight />}
                    </button>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="label-sm text-text-dim block">{label}</label>
      {children}
      {error && <p className="label-sm text-red-400">{error}</p>}
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
