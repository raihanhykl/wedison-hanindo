# 📊 Setup Tracking & Analytics untuk Reporting

## Quick Setup Guide

### 1. Google Tag Manager (GTM) - WAJIB

**Langkah-langkah:**
1. Buat akun di [tagmanager.google.com](https://tagmanager.google.com)
2. Buat Container baru → Pilih "Web"
3. Copy **GTM Container ID** (format: `GTM-XXXXXXX`)

**Update di kode:**
```typescript
// File: utils/analytics.ts
export const GTM_ID = 'GTM-XXXXXXX' // Ganti dengan GTM ID Anda
```

**Atau gunakan Environment Variable (Recommended untuk production):**
```env
# File: .env.local
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Status:** ✅ **Sudah terintegrasi** - Tinggal update GTM_ID

### 2. Google Analytics 4 (GA4) - Recommended

**Langkah-langkah:**
1. Buat GA4 Property di [analytics.google.com](https://analytics.google.com)
2. Setup GA4 Stream untuk website
3. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Connect GA4 ke GTM (lihat panduan di bawah)

**Status:** ⚙️ **Harus dikonfigurasi di GTM Dashboard** (tidak perlu coding)

### 3. Facebook Pixel (Optional - untuk Facebook Ads)

**Langkah-langkah:**
1. Buat Pixel di [Facebook Business Manager](https://business.facebook.com)
2. Copy **Pixel ID** (format: `123456789012345`)
3. Setup di GTM (lihat panduan di bawah)

**Status:** ⚙️ **Harus dikonfigurasi di GTM Dashboard**

## Yang Sudah Disiapkan di Kode

### ✅ Event Tracking Functions

File: `utils/analytics.ts`

**Fungsi yang sudah tersedia:**
1. `pageview(url)` - Track page views
2. `trackWhatsAppClick(source)` - Track WhatsApp button clicks
3. `trackTestDriveClick()` - Track test drive bookings
4. `trackEvent(action, category, label, value)` - Track custom events
5. `trackSectionView(sectionName)` - Track section views (future)

### ✅ Event yang Sudah Terintegrasi

**WhatsApp Clicks** (Primary Conversion):
- ✅ Hero Slider buttons (`hero-slider-sewa`, `hero-slider-subsidi`, dll)
- ✅ Navbar WhatsApp button (`navbar`)
- ✅ Floating WhatsApp button (`floating-button`)
- ✅ Model detail buttons (`model-tab-edpower`, dll)
- ✅ Showroom section (`showroom-test-drive`)
- ✅ Final CTA section (`final-cta`)

**Pageviews**:
- ✅ Automatic pageview tracking setiap route change
- ✅ Include URL hash (untuk deep linking ke sections)

**Test Drive Clicks**:
- ✅ Showroom section buttons

### ✅ Component yang Sudah Dibuat

1. **GoogleTagManager** (`app/components/analytics/GoogleTagManager.tsx`)
   - Load GTM script di `<head>`
   - Include noscript fallback
   - Auto-hide jika GTM ID belum di-set

2. **Analytics** (`app/components/analytics/Analytics.tsx`)
   - Track pageviews otomatis
   - Handle route changes
   - Send ke dataLayer

3. **FloatingWhatsAppButton** (`app/components/ui/FloatingWhatsAppButton.tsx`)
   - Track WhatsApp clicks dengan source `floating-button`

## Setup di GTM Dashboard

### Step 1: Setup Google Analytics 4 Tag

**Di GTM Dashboard:**

1. **Buat Tag "GA4 Configuration":**
   - Tag Type: `Google Analytics: GA4 Configuration`
   - Measurement ID: Masukkan GA4 Measurement ID Anda
   - Trigger: `All Pages`
   - **Publish** tag

2. **Buat Tag "GA4 Event - WhatsApp Click":**
   - Tag Type: `Google Analytics: GA4 Event`
   - Configuration Tag: Pilih tag "GA4 Configuration" di atas
   - Event Name: `whatsapp_click`
   - Event Parameters:
     - `source` → `{{Event Label}}`
   - Trigger: Custom Event
     - Event name equals: `customEvent`
     - Condition: `Event Category` equals `WhatsApp`

3. **Buat Tag "GA4 Event - Pageview":**
   - Tag Type: `Google Analytics: GA4 Event`
   - Configuration Tag: Pilih tag "GA4 Configuration"
   - Event Name: `page_view`
   - Trigger: Custom Event
     - Event name equals: `pageview`

### Step 2: Setup Facebook Pixel (Jika Perlu)

**Di GTM Dashboard:**

1. **Buat Tag "Facebook Pixel - Base Code":**
   - Tag Type: `Custom HTML`
   - HTML:
     ```html
     <script>
       !function(f,b,e,v,n,t,s)
       {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
       n.callMethod.apply(n,arguments):n.queue.push(arguments)};
       if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
       n.queue=[];t=b.createElement(e);t.async=!0;
       t.src=v;s=b.getElementsByTagName(e)[0];
       s.parentNode.insertBefore(t,s)}(window, document,'script',
       'https://connect.facebook.net/en_US/fbevents.js');
       fbq('init', 'YOUR_PIXEL_ID');
       fbq('track', 'PageView');
     </script>
     <noscript>
       <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"/>
     </noscript>
     ```
   - Replace `YOUR_PIXEL_ID` dengan Pixel ID Anda
   - Trigger: `All Pages`

2. **Buat Tag "Facebook Pixel - WhatsApp Click":**
   - Tag Type: `Custom HTML`
   - HTML:
     ```html
     <script>
       fbq('trackCustom', 'WhatsAppClick', {
         source: '{{Event Label}}'
       });
     </script>
     ```
   - Trigger: Custom Event
     - Event name equals: `customEvent`
     - Condition: `Event Category` equals `WhatsApp`

### Step 3: Setup Conversion Goals

**Di Google Analytics 4:**

1. **WhatsApp Click sebagai Conversion:**
   - Masuk ke GA4 Admin → Events
   - Find event `whatsapp_click`
   - Toggle "Mark as conversion"

2. **Test Drive Booking sebagai Conversion:**
   - Find event `test_drive_click` (atau custom event name)
   - Toggle "Mark as conversion"

3. **Lead Form Submit sebagai Conversion:**
   - Find event `lead_form_submit` (atau custom event name)
   - Toggle "Mark as conversion"

## Metrics yang Akan Ter-track

### 1. Traffic Metrics ✅
- Total Visitors
- Unique Visitors
- Pageviews
- Sessions
- Session Duration
- Bounce Rate
- Pages per Session

### 2. Conversion Metrics ✅
- **WhatsApp Clicks** (Primary KPI)
  - Total WhatsApp clicks
  - Click rate (% of visitors who clicked)
  - Source breakdown (dari mana user klik)
- **Test Drive Bookings**
- **Lead Form Submissions**
- **Financing Calculator Completions**

### 3. Engagement Metrics ⚙️ (Future)
- Section Views (Models, Financing, Comparison)
- Accordion Expansions (FAQ, Technical Specs)
- Video Plays
- Slider Interactions
- Chart Interactions

### 4. User Journey Metrics ⚙️ (Future)
- Entry Points (dari mana user masuk)
- Exit Points (di mana user keluar)
- Scroll Depth (berapa % halaman di-scroll)
- Time on Page per Section

## Testing Checklist

### Before Going Live:

- [ ] **GTM ID sudah diupdate** di `utils/analytics.ts`
- [ ] **Test GTM dengan Google Tag Assistant** extension
- [ ] **Verify GTM Preview Mode** - semua tag fire dengan benar
- [ ] **Test semua WhatsApp click events** - verify muncul di GTM Preview
- [ ] **Test pageview tracking** - verify muncul di GA4 Real-time
- [ ] **Verify events muncul di GA4 Real-time reports**
- [ ] **Setup conversion goals** di GA4
- [ ] **Test di desktop & mobile**
- [ ] **Check browser console** - tidak ada JavaScript errors
- [ ] **Verify dataLayer** di console: `window.dataLayer`

### Testing Tools:

1. **Google Tag Assistant** - Chrome Extension
2. **GTM Preview Mode** - Test tags sebelum publish
3. **GA4 Real-time Reports** - Verify events live
4. **Browser Console** - Check `window.dataLayer` array

## Reporting Dashboard Setup

### 1. GA4 Custom Reports

**Buat Custom Report untuk WhatsApp Conversions:**
- Dimensions: Date, Event Source, Device Category
- Metrics: Event Count, Users, Conversion Rate
- Filter: Event Name = `whatsapp_click`

**Buat Custom Report untuk User Journey:**
- Dimensions: Page, Landing Page, Exit Page
- Metrics: Pageviews, Sessions, Bounce Rate

### 2. Key Metrics Dashboard

**Metrics yang penting untuk track:**
- Daily WhatsApp Clicks
- WhatsApp Click Rate (%)
- Top Conversion Sources
- User Journey Flow
- Device Breakdown (Mobile vs Desktop)

### 3. Alerts Setup

**Setup Alerts di GA4:**
- Alert jika WhatsApp clicks drop >20% dari hari sebelumnya
- Alert jika bounce rate naik >10%
- Alert jika pageviews drop >30%

## Environment Variables (Production)

**Create `.env.local` untuk development:**
```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
```

**Setup di Vercel/Production:**
- Masuk ke Vercel Dashboard → Project Settings → Environment Variables
- Tambahkan:
  - `NEXT_PUBLIC_GTM_ID` = `GTM-XXXXXXX`
  - `NEXT_PUBLIC_GA4_ID` = `G-XXXXXXXXXX` (optional)
  - `NEXT_PUBLIC_FB_PIXEL_ID` = `123456789012345` (optional)

## Summary: Apa yang Perlu Disiapkan

### ✅ Yang Sudah Siap (Tidak Perlu Coding Lagi):
1. ✅ GTM integration code
2. ✅ Event tracking functions
3. ✅ WhatsApp click tracking di semua button
4. ✅ Pageview tracking
5. ✅ Analytics components

### ⚙️ Yang Perlu Disiapkan (Setup Manual):

1. **GTM Account & Container** (5 menit)
   - Buat account di tagmanager.google.com
   - Buat container
   - Copy GTM ID
   - Update di `utils/analytics.ts`

2. **GA4 Property** (10 menit)
   - Buat GA4 property
   - Setup data stream untuk website
   - Copy Measurement ID
   - Setup GA4 tag di GTM

3. **GTM Tags Setup** (30 menit)
   - GA4 Configuration tag
   - GA4 Event tags (WhatsApp click, pageview)
   - Facebook Pixel tags (jika perlu)
   - Test di Preview Mode
   - Publish

4. **GA4 Goals Setup** (10 menit)
   - Mark WhatsApp click sebagai conversion
   - Mark test drive sebagai conversion
   - Mark lead form submit sebagai conversion

5. **Testing & Verification** (15 menit)
   - Test dengan Tag Assistant
   - Verify di GA4 Real-time
   - Test semua events

**Total waktu setup: ~1 jam**

## Troubleshooting

### GTM Tidak Load?

1. Check GTM_ID sudah benar (bukan `GTM-XXXXXXX`)
2. Check browser console untuk errors
3. Check Network tab - apakah `gtm.js` di-load?
4. Verify GTM container sudah publish

### Events Tidak Terkirim?

1. Check GTM Preview Mode
2. Check browser console: `window.dataLayer`
3. Verify event names sesuai dengan GTM triggers
4. Check apakah dataLayer sudah initialize

### Data Tidak Muncul di GA4?

1. Check GA4 tag sudah dibuat di GTM
2. Check Measurement ID sudah benar
3. Check tag sudah publish di GTM
4. Check GA4 Real-time reports (bisa delay 24-48 jam untuk standard reports)

---

**Setup Guide Lengkap:** Lihat `docs/GTM_SETUP_GUIDE.md` untuk detail lengkap
