# 📊 Setup Google Tag Manager (GTM) & Tracking Codes

## Persiapan yang Perlu Disiapkan

### 1. Google Tag Manager (GTM) Account & Container

**Langkah-langkah:**
1. Buat Google Tag Manager account di [tagmanager.google.com](https://tagmanager.google.com)
2. Buat Container baru untuk website Wedison
3. Copy **GTM Container ID** (format: `GTM-XXXXXXX`)

**Yang perlu disiapkan:**
- ✅ GTM Container ID (format: `GTM-XXXXXXX`)
- ✅ Akses ke Google Tag Manager dashboard
- ✅ Pemahaman dasar tentang tags, triggers, dan variables di GTM

### 2. Google Analytics 4 (GA4) Property (Optional but Recommended)

**Langkah-langkah:**
1. Buat Google Analytics 4 property di [analytics.google.com](https://analytics.google.com)
2. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)
3. Connect GA4 ke GTM (akan dikonfigurasi di GTM)

**Yang perlu disiapkan:**
- ✅ GA4 Property ID
- ✅ Measurement ID (format: `G-XXXXXXXXXX`)

### 3. Facebook Pixel (Optional - untuk Facebook Ads)

**Langkah-langkah:**
1. Buat Facebook Pixel di [Facebook Business Manager](https://business.facebook.com)
2. Copy **Pixel ID** (format: `123456789012345`)

**Yang perlu disiapkan:**
- ✅ Facebook Pixel ID

### 4. Platform Tracking Lainnya (Optional)

**Yang bisa ditambahkan:**
- TikTok Pixel (untuk TikTok Ads)
- LinkedIn Insight Tag (untuk LinkedIn Ads)
- Microsoft Clarity (untuk user behavior analytics)
- Hotjar (untuk heatmaps & session recordings)
- Custom tracking code (jika ada)

## Setup di Kode

### Step 1: Update GTM ID

Edit file `utils/analytics.ts`:

```typescript
export const GTM_ID = 'GTM-XXXXXXX' // Replace dengan GTM Container ID Anda
```

### Step 2: Verify GTM Integration

Setelah GTM ID diupdate, kode akan otomatis:
- ✅ Load GTM script di `<head>`
- ✅ Setup dataLayer untuk event tracking
- ✅ Track pageviews otomatis

### Step 3: Test GTM

1. Install [Google Tag Assistant](https://tagassistant.google.com/) extension
2. Buka website di browser
3. Check apakah GTM container sudah load
4. Check apakah dataLayer sudah terbuat

## Event Tracking yang Sudah Terintegrasi

### 1. WhatsApp Clicks
**Event:** `customEvent`  
**Category:** `WhatsApp`  
**Action:** `click`  
**Label:** Source (e.g., `hero-slider-sewa`, `navbar`, `floating-button`)

**Contoh:**
```typescript
trackWhatsAppClick('hero-slider-sewa')
// Sends: { event: 'customEvent', eventCategory: 'WhatsApp', eventAction: 'click', eventLabel: 'hero-slider-sewa' }
```

**Lokasi di kode:**
- Hero Slider buttons
- Navbar WhatsApp button
- Floating WhatsApp button
- Model detail buttons
- Showroom section
- Final CTA section

### 2. Pageviews
**Event:** `pageview`  
**Page:** URL path

**Contoh:**
```typescript
pageview('/#models-edpower')
// Sends: { event: 'pageview', page: '/#models-edpower' }
```

**Lokasi di kode:**
- Otomatis track setiap kali route/page berubah
- Di `app/components/analytics/Analytics.tsx`

### 3. Test Drive Clicks
**Event:** `customEvent`  
**Category:** `CTA`  
**Action:** `click`  
**Label:** `Test Drive Booking`

**Contoh:**
```typescript
trackTestDriveClick()
// Sends: { event: 'customEvent', eventCategory: 'CTA', eventAction: 'click', eventLabel: 'Test Drive Booking' }
```

**Lokasi di kode:**
- Showroom section buttons
- Model detail section buttons

### 4. Section Views (Future)
**Event:** `customEvent`  
**Category:** `Section`  
**Action:** `view`  
**Label:** Section name (e.g., `models`, `financing`, `comparison`)

**Contoh:**
```typescript
trackSectionView('models')
// Sends: { event: 'customEvent', eventCategory: 'Section', eventAction: 'view', eventLabel: 'models' }
```

## Konfigurasi di GTM Dashboard

### 1. Setup Google Analytics 4 Tag

**Di GTM Dashboard:**

1. **Buat Tag baru:**
   - Tag Type: `Google Analytics: GA4 Configuration`
   - Measurement ID: `G-XXXXXXXXXX` (GA4 Measurement ID)
   - Trigger: `All Pages`

2. **Buat Event Tag untuk WhatsApp Clicks:**
   - Tag Type: `Google Analytics: GA4 Event`
   - Measurement ID: `G-XXXXXXXXXX`
   - Event Name: `whatsapp_click` (atau sesuai kebutuhan)
   - Event Parameters:
     - `source` = `{{Event Label}}`
   - Trigger: Custom Event → Event name = `customEvent` → Event Category = `WhatsApp`

3. **Buat Event Tag untuk Pageviews:**
   - Tag Type: `Google Analytics: GA4 Event`
   - Measurement ID: `G-XXXXXXXXXX`
   - Event Name: `page_view`
   - Trigger: Custom Event → Event name = `pageview`

### 2. Setup Facebook Pixel Tag (Jika perlu)

**Di GTM Dashboard:**

1. **Buat Tag baru:**
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
     ```
   - Trigger: `All Pages`

2. **Track WhatsApp Clicks sebagai Facebook Event:**
   - Tag Type: `Custom HTML`
   - HTML:
     ```html
     <script>
       fbq('trackCustom', 'WhatsAppClick', {
         source: '{{Event Label}}'
       });
     </script>
     ```
   - Trigger: Custom Event → Event name = `customEvent` → Event Category = `WhatsApp`

### 3. Setup Conversion Tracking

**Event yang bisa di-track sebagai conversion:**

1. **WhatsApp Click** → Conversion
2. **Test Drive Booking** → Conversion
3. **Lead Form Submit** → Conversion
4. **Financing Calculator Complete** → Micro-conversion
5. **Section View (Models, Financing)** → Engagement

**Setup di GTM:**
- Buat Tag dengan Tag Type sesuai platform
- Set Event parameters sesuai kebutuhan
- Connect ke conversion goals di masing-masing platform

## Environment Variables (Recommended)

Untuk production setup, gunakan environment variables:

### Create `.env.local`:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
```

### Update `utils/analytics.ts`:

```typescript
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || ''
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || ''
```

## Metrics yang Bisa Ditrack

### 1. Traffic Metrics
- ✅ Pageviews
- ✅ Unique Visitors
- ✅ Session Duration
- ✅ Bounce Rate
- ✅ Pages per Session

### 2. Conversion Metrics
- ✅ WhatsApp Clicks (Primary Conversion)
- ✅ Test Drive Bookings
- ✅ Lead Form Submissions
- ✅ Financing Calculator Completions

### 3. Engagement Metrics
- ✅ Section Views (Models, Financing, Comparison, dll)
- ✅ Video Plays (jika ada)
- ✅ Accordion Expansions (FAQ, Technical Specs)
- ✅ Slider Interactions (Hero Slider)
- ✅ Chart Interactions (Comparison Section)

### 4. User Behavior Metrics
- ✅ Scroll Depth (berapa % halaman yang di-scroll)
- ✅ Time on Page
- ✅ Exit Points (di mana user meninggalkan halaman)
- ✅ Click Heatmaps (butuh Hotjar atau Microsoft Clarity)

## Testing Checklist

### Before Going Live:

- [ ] GTM Container ID sudah diupdate di `utils/analytics.ts`
- [ ] Test GTM dengan Google Tag Assistant
- [ ] Verify dataLayer events muncul di GTM Preview mode
- [ ] Test semua WhatsApp click events
- [ ] Test pageview tracking
- [ ] Test di desktop & mobile
- [ ] Verify events muncul di GA4 Real-time reports
- [ ] Setup conversion goals di GA4
- [ ] Test Facebook Pixel (jika digunakan)
- [ ] Verify tidak ada console errors

## Troubleshooting

### GTM Tidak Load?

**Checklist:**
1. ✅ GTM ID sudah benar di `utils/analytics.ts`
2. ✅ GTM ID bukan `GTM-XXXXXXX` (placeholder)
3. ✅ Check browser console untuk errors
4. ✅ Check Network tab apakah GTM script di-load

### Events Tidak Terkirim?

**Checklist:**
1. ✅ Check GTM Preview mode
2. ✅ Check dataLayer di browser console: `window.dataLayer`
3. ✅ Verify event names sesuai dengan GTM triggers
4. ✅ Check browser console untuk JavaScript errors

### Data Tidak Muncul di GA4?

**Checklist:**
1. ✅ GA4 tag sudah dibuat di GTM
2. ✅ Measurement ID sudah benar
3. ✅ Tag sudah publish di GTM
4. ✅ Check GA4 Real-time reports (bisa delay 24-48 jam untuk standard reports)

## Advanced Tracking (Future)

### 1. Enhanced E-commerce Tracking
- Track product views (model views)
- Track add to cart (simulasi kredit)
- Track purchases (lead form submit)

### 2. User Properties
- Track user segments (interested in: Mini, Athena, Victory, EdPower)
- Track user journey (from which section user converted)
- Track user engagement score

### 3. Custom Dimensions
- Traffic source (organic, paid, direct)
- User intent (just browsing, ready to buy, comparison shopping)
- Device type (mobile, desktop, tablet)
- Location (based on IP)

## Documentation

Setelah GTM setup:
- ✅ Document semua events yang ditrack
- ✅ Create event tracking sheet (Excel/Google Sheets)
- ✅ Setup dashboards di GA4 untuk key metrics
- ✅ Setup alerts untuk conversion drops
- ✅ Schedule regular reports untuk stakeholders

---

**Last Updated**: January 2026
