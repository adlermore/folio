import { HeroSection }     from '@/components/sections/HeroSection'
import { ServicesSection }  from '@/components/sections/ServicesSection'
import { AboutSection }     from '@/components/sections/AboutSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { ProcessSection }   from '@/components/sections/ProcessSection'
import { ClientsSection }   from '@/components/sections/ClientsSection'
import { ContactSection }   from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <ProcessSection />
      <ClientsSection />
      <ContactSection />
    </>
  )
}
