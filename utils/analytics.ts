// Google Tag Manager / Analytics Setup
// 
// SETUP INSTRUCTIONS:
// 1. Buat GTM Container di https://tagmanager.google.com
// 2. Copy GTM Container ID (format: GTM-XXXXXXX)
// 3. Update GTM_ID di bawah ini
// 4. Untuk production, gunakan environment variable: NEXT_PUBLIC_GTM_ID
//
// READ MORE: docs/GTM_SETUP_GUIDE.md

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NRFXB3GJ'

// Optional: Google Analytics 4 Measurement ID
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '' // Format: G-XXXXXXXXXX

// Optional: Facebook Pixel ID
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '' // Format: 123456789012345

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'pageview',
      page: url,
    })
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'customEvent',
      eventAction: action,
      eventCategory: category,
      eventLabel: label,
      eventValue: value,
    })
  }
}

// Predefined event trackers
export const trackWhatsAppClick = (source: string) => {
  trackEvent('click', 'WhatsApp', source)
}

export const trackTestDriveClick = () => {
  trackEvent('click', 'CTA', 'Test Drive Booking')
}

export const trackVideoPlay = (videoName: string) => {
  trackEvent('play', 'Video', videoName)
}

export const trackSectionView = (sectionName: string) => {
  trackEvent('view', 'Section', sectionName)
}

export const trackLeadFormSubmit = (program: string, model?: string) => {
  trackEvent('submit', 'LeadForm', program, model ? 1 : 0)
  
  // Also push detailed lead data for GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'leadFormSubmit',
      leadProgram: program,
      leadModel: model || '',
    })
  }
}
