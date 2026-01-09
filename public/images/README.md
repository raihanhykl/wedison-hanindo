# Images Directory Structure

## Folder Structure

```
/public/images/
  ├── brand/
  │   ├── wedison-hero.jpg      # Brand promo image (slide 1)
  │   └── subsidi-hero.jpg      # Subsidi program image (slide 2)
  └── models/
      └── models-hero.jpg       # All models overview (slide 3)
```

## Image Requirements

### Format
- JPG, PNG, atau WebP
- Recommended: JPG untuk photos, WebP untuk optimization

### Size
- **Recommended**: 1920x1080px (16:9 aspect ratio)
- **Minimum**: 1280x720px
- **Maximum**: 3840x2160px (4K)

### File Size
- Optimize to **<500KB** per image
- Use compression tools like:
  - TinyPNG / TinyJPG
  - ImageOptim
  - Squoosh

### Quality
- High quality untuk hero section
- Professional product photography
- Good lighting and composition

## Current Slides & Images

1. **Wedison Promo** (`wedison-hero.jpg`)
   - Path: `/images/brand/wedison-hero.jpg`
   - Description: Dark blue maxi-scooter in winter landscape
   - Highlight: "PROMO SPESIAL - Sewa Rp 50 per hari"
   - CTA: Direct to WhatsApp

2. **Subsidi** (`subsidi-hero.jpg`)
   - Path: `/images/brand/subsidi-hero.jpg`
   - Description: Image related to government subsidy program
   - Highlight: "SUBSIDI HINGGA 8 JUTA"
   - CTA: Direct to WhatsApp

3. **Models Overview** (`models-hero.jpg`)
   - Path: `/images/models/models-hero.jpg`
   - Description: All models showcase or product lineup
   - Highlight: "PILIH MODEL ANDA"
   - CTA: Scroll to models section

## Troubleshooting

### Image tidak muncul?
1. Cek nama file harus **exact match** (case-sensitive)
2. File harus di folder `/public/images/...`
3. Refresh browser dengan hard refresh (Ctrl+F5 / Cmd+Shift+R)
4. Cek browser console untuk error 404

### Image terlalu gelap?
- Overlay gradient sudah dikurangi opacity
- Jika masih terlalu gelap, bisa adjust di HeroSlider.tsx line 188

### Image tidak sesuai aspect ratio?
- Gunakan CSS `object-cover` (sudah diterapkan)
- Atau crop image ke 16:9 ratio sebelum upload
