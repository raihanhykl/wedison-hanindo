# ✅ Checklist Setup Tracking & Analytics

## Persiapan yang Perlu Disiapkan

### 1. Google Tag Manager (GTM) - WAJIB ✅

**Setup:**
- [ ] Buat account di [tagmanager.google.com](https://tagmanager.google.com)
- [ ] Buat Container baru untuk website
- [ ] Copy GTM Container ID (format: `GTM-XXXXXXX`)
- [ ] Update di `utils/analytics.ts`: 
  ```typescript
  export const GTM_ID = 'GTM-XXXXXXX' // Ganti dengan GTM ID Anda
  ```
- [ ] Atau gunakan environment variable:
  ```env
  NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
  ```

**Testing:**
- [ ] Install [Google Tag Assistant](https://tagassistant.google.com/) extension
- [ ] Buka website, verify GTM container load
- [ ] Check browser console: `window.dataLayer` ada
- [ ] Verify tidak ada console errors

**Time: ~15 menit**

---

### 2. Google Analytics 4 (GA4) - Recommended ✅

**Setup:**
- [ ] Buat GA4 Property di [analytics.google.com](https://analytics.google.com)
- [ ] Setup Data Stream untuk website
- [ ] Copy Measurement ID (format: `G-XXXXXXXXXX`)

**Setup di GTM:**
- [ ] Buat Tag "GA4 Configuration" di GTM
  - Tag Type: `Google Analytics: GA4 Configuration`
  - Measurement ID: Masukkan GA4 ID
  - Trigger: `All Pages`
- [ ] Buat Tag "GA4 Event - WhatsApp Click"
  - Tag Type: `Google Analytics: GA4 Event`
  - Event Name: `whatsapp_click`
  - Event Parameter: `source` = `{{Event Label}}`
  - Trigger: Custom Event → Event = `customEvent`, Category = `WhatsApp`
- [ ] Buat Tag "GA4 Event - Pageview"
  - Tag Type: `Google Analytics: GA4 Event`
  - Event Name: `page_view`
  - Trigger: Custom Event → Event = `pageview`
- [ ] **Publish** semua tags di GTM

**Setup Conversions di GA4:**
- [ ] Admin → Events → Mark `whatsapp_click` as conversion
- [ ] Mark `test_drive_click` as conversion (jika ada)
- [ ] Mark `lead_form_submit` as conversion (jika ada)

**Testing:**
- [ ] GTM Preview Mode - verify semua tag fire
- [ ] GA4 Real-time reports - verify events muncul
- [ ] Test WhatsApp click - verify muncul di GA4
- [ ] Test pageview - verify muncul di GA4

**Time: ~30 menit**

---

### 3. Facebook Pixel (Optional) ⚙️

**Jika menggunakan Facebook Ads:**

**Setup:**
- [ ] Buat Pixel di [Facebook Business Manager](https://business.facebook.com)
- [ ] Copy Pixel ID (format: `123456789012345`)

**Setup di GTM:**
- [ ] Buat Tag "Facebook Pixel - Base Code"
  - Tag Type: `Custom HTML`
  - Paste Facebook Pixel base code
  - Replace `YOUR_PIXEL_ID` dengan Pixel ID
  - Trigger: `All Pages`
- [ ] Buat Tag "Facebook Pixel - WhatsApp Click"
  - Tag Type: `Custom HTML`
  - Event: `fbq('trackCustom', 'WhatsAppClick', {source: '{{Event Label}}'})`
  - Trigger: Custom Event → Event = `customEvent`, Category = `WhatsApp`
- [ ] **Publish** tags

**Testing:**
- [ ] Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) extension
- [ ] Verify pixel fire di website
- [ ] Test WhatsApp click - verify event terkirim
- [ ] Check Facebook Events Manager - verify events muncul

**Time: ~20 menit**

---

### 4. Environment Variables (Production)

**Create `.env.local` untuk development:**
```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
```

**Setup di Vercel/Production:**
- [ ] Masuk ke Vercel Dashboard
- [ ] Project Settings → Environment Variables
- [ ] Tambahkan:
  - `NEXT_PUBLIC_GTM_ID` = `GTM-XXXXXXX`
  - `NEXT_PUBLIC_GA4_ID` = `G-XXXXXXXXXX` (optional)
  - `NEXT_PUBLIC_FB_PIXEL_ID` = `123456789012345` (optional)
- [ ] Redeploy website

**Time: ~5 menit**

---

## Event Tracking yang Sudah Terintegrasi

### ✅ WhatsApp Clicks (Primary Conversion)

**Events yang sudah ter-track:**
- [x] `hero-slider-sewa` - Hero slider Sewa button
- [x] `hero-slider-subsidi` - Hero slider Subsidi button
- [x] `hero-slider-voucher-charging` - Hero slider Voucher button
- [x] `hero-slider-models` - Hero slider Models button
- [x] `navbar` - Navbar WhatsApp button
- [x] `floating-button` - Floating WhatsApp button
- [x] `model-tab-edpower` - Model tab EdPower button
- [x] `model-tab-athena` - Model tab Athena button
- [x] `model-tab-victory` - Model tab Victory button
- [x] `model-tab-mini` - Model tab Mini button
- [x] `showroom-test-drive` - Showroom test drive button
- [x] `final-cta` - Final CTA section button

**Data yang dikirim:**
```javascript
{
  event: 'customEvent',
  eventCategory: 'WhatsApp',
  eventAction: 'click',
  eventLabel: 'source-name' // e.g., 'hero-slider-sewa'
}
```

### ✅ Pageviews

**Automatic tracking:**
- [x] Track setiap route change
- [x] Include URL hash (untuk deep linking)

**Data yang dikirim:**
```javascript
{
  event: 'pageview',
  page: '/#models-edpower' // URL dengan hash
}
```

### ✅ Test Drive Clicks

**Events:**
- [x] `showroom-test-drive` - Showroom section button

**Data yang dikirim:**
```javascript
{
  event: 'customEvent',
  eventCategory: 'CTA',
  eventAction: 'click',
  eventLabel: 'Test Drive Booking'
}
```

---

## Setup GTM Dashboard (Step by Step)

### Step 1: GTM Container Setup

1. Masuk ke [tagmanager.google.com](https://tagmanager.google.com)
2. Create Account (jika belum ada)
3. Create Container → Pilih "Web"
4. Container Name: "Wedison Website" (atau sesuai)
5. Target Platform: Web
6. Copy GTM Container ID

### Step 2: GA4 Tag Setup

**Create GA4 Configuration Tag:**
1. Tags → New
2. Tag Configuration → Google Analytics: GA4 Configuration
3. Measurement ID: Masukkan GA4 Measurement ID
4. Triggering → All Pages
5. Save → Name: "GA4 - Configuration"
6. Submit → Publish

**Create GA4 Event Tag - WhatsApp Click:**
1. Tags → New
2. Tag Configuration → Google Analytics: GA4 Event
3. Configuration Tag: Pilih "GA4 - Configuration"
4. Event Name: `whatsapp_click`
5. Event Parameters:
   - Parameter Name: `source`
   - Value: `{{Event Label}}`
6. Triggering → New Trigger
   - Trigger Type: Custom Event
   - Event name equals: `customEvent`
   - Condition: `Event Category` equals `WhatsApp`
7. Save → Name: "GA4 - WhatsApp Click"
8. Submit → Publish

### Step 3: Test dengan Preview Mode

1. Klik "Preview" di GTM
2. Masukkan URL website: `http://localhost:3000`
3. New Tab terbuka dengan GTM Preview
4. Test semua actions:
   - Click WhatsApp button → Verify tag fire
   - Navigate ke section lain → Verify pageview tag fire
   - Check Data Layer → Verify events ada

### Step 4: Verify di GA4

1. Masuk ke GA4 Dashboard
2. Reports → Realtime
3. Verify events muncul:
   - `page_view` events
   - `whatsapp_click` events
4. Verify parameters terkirim (source)

---

## Metrics yang Bisa Dilacak

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
  - Total clicks per hari/bulan
  - Click rate (%)
  - Source breakdown (dari mana user klik)
  - Time of day analysis
- **Test Drive Bookings**
- **Lead Form Submissions**
- **Financing Calculator Completions**

### 3. User Behavior Metrics ⚙️ (Future)
- Scroll Depth
- Time on Page per Section
- Exit Points
- User Journey Flow

---

## Reporting Dashboard Setup

### 1. GA4 Custom Reports

**Create "WhatsApp Conversions" Report:**
- Dimensions: Date, Event Source, Device Category
- Metrics: Event Count, Users, Conversion Rate
- Filter: Event Name = `whatsapp_click`

**Create "User Journey" Report:**
- Dimensions: Page, Landing Page, Exit Page
- Metrics: Pageviews, Sessions, Bounce Rate

### 2. Key Metrics to Monitor

**Daily Metrics:**
- Total WhatsApp Clicks
- WhatsApp Click Rate (%)
- Top 5 Conversion Sources
- Mobile vs Desktop Breakdown

**Weekly Metrics:**
- Conversion Trend
- User Journey Flow
- Section Engagement
- Device & Browser Breakdown

**Monthly Metrics:**
- Overall Conversion Rate
- Traffic Sources
- User Segments
- ROI dari traffic sources

---

## Quick Reference

### File Locations:
- **GTM Setup:** `utils/analytics.ts` → Update `GTM_ID`
- **GTM Component:** `app/components/analytics/GoogleTagManager.tsx`
- **Analytics Component:** `app/components/analytics/Analytics.tsx`
- **Event Tracking:** `utils/analytics.ts` → Functions sudah ready

### Event Names di GTM:
- WhatsApp Click: `customEvent` dengan Category `WhatsApp`
- Pageview: `pageview`
- Test Drive: `customEvent` dengan Category `CTA`

### Testing Tools:
1. **Google Tag Assistant** - Chrome Extension
2. **GTM Preview Mode** - Test tags before publish
3. **GA4 Real-time Reports** - Verify events live
4. **Browser Console** - Check `window.dataLayer`

---

## Time Estimate

**Minimum Setup (GTM + GA4):**
- GTM Account Setup: 5 menit
- GA4 Property Setup: 10 menit
- GTM Tags Setup: 20 menit
- Testing: 10 menit
- **Total: ~45 menit**

**Full Setup (GTM + GA4 + Facebook Pixel):**
- + Facebook Pixel Setup: 15 menit
- **Total: ~1 jam**

---

**Detail Setup Guide:** Lihat `docs/GTM_SETUP_GUIDE.md`  
**Tracking Events:** Lihat `docs/TRACKING_SETUP.md`
