'use client'

import { getCampaignConfig } from '@/lib/campaigns'
import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import FloatingWhatsAppButton from '@/app/components/ui/FloatingWhatsAppButton'
import BannerSlider from '@/app/components/sections/BannerSlider'
import PainPointsSection from '@/app/components/sections/PainPointsSection'
import CombinedSavingsSection from '@/app/components/sections/CombinedSavingsSection'
import ModelsTabSection from '@/app/components/sections/ModelsTabSection'
import FinancingSection from '@/app/components/sections/FinancingSection'
import ShowroomSection from '@/app/components/sections/ShowroomSection'
import FAQSection from '@/app/components/sections/FAQSection'
import LeadFormSection from '@/app/components/sections/LeadFormSection'

export default function HomePage() {
  // Use default campaign config
  const config = getCampaignConfig('012026', 'general')

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Banner Slider */}
      <BannerSlider />
      
      {/* Pain Points */}
      <PainPointsSection />
      
      {/* Combined Savings Calculator + Stories + Pricing */}
      <CombinedSavingsSection config={config!} />
      
      {/* Models */}
      <ModelsTabSection />
      
      {/* Financing */}
      <FinancingSection />
      
      {/* Showroom */}
      <ShowroomSection />
      
      {/* FAQ */}
      <FAQSection />
      
      {/* Lead Form */}
      <LeadFormSection />
      
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
    </main>
  )
}
