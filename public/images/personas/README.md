# 📸 Gambar Background Personas Section

## Lokasi File

Taruh gambar background untuk Personas Section di folder ini:
```
/public/images/personas/
```

## Nama File yang Diperlukan

Hanya **1 gambar background** untuk seluruh Personas Section:

**Nama file (pilih salah satu):**
- `personas-background.jpg` ✅ (Recommended)
- `personas-background.png`
- `personas-background.webp`

## Format File yang Didukung

- **JPG/JPEG** (Recommended - file size lebih kecil)
- **PNG** (Jika butuh transparansi)
- **WebP** (Best untuk web - file size sangat kecil)

## Spesifikasi Gambar

### Ukuran (Recommended):
- **Desktop**: 1920x1080px (16:9 aspect ratio, landscape)
- **Mobile**: 1920x1080px (akan auto-responsive)
- **Minimum**: 1280x720px
- **Maximum**: 2560x1440px (jangan terlalu besar, akan slow loading)

### File Size:
- **Target**: <500KB per gambar
- **Maximum**: <1MB per gambar
- **Tip**: Gunakan [TinyPNG](https://tinypng.com) atau [ImageOptim](https://imageoptim.com) untuk compress

### Kualitas Gambar:
- **High quality** lifestyle image yang mencerminkan berbagai personas:
  - Professional Urban (business, office, city)
  - Young Entrepreneur (startup, modern, dynamic)
  - Eco-Conscious Driver (nature, green, sustainable)
  - Gig Worker/Delivery Driver (urban, practical, everyday)
- **Background**: Bisa solid color atau gradient
- **Content**: Bisa foto orang dengan motor Wedison, atau lifestyle scene yang representatif
- **Resolution**: Minimum 72 DPI (untuk web)
- **Orientation**: Landscape (16:9 atau 4:3)

## Struktur Folder Final

Setelah menambahkan gambar, struktur folder akan seperti ini:

```
/public/images/personas/
  ├── personas-background.jpg    ← Background image (Required)
  └── README.md                  ← File ini
```

## Cara Menambahkan Gambar

### Langkah 1: Siapkan Gambar
1. Pastikan gambar sudah di-optimize (compress)
2. Pastikan ukuran minimum 1280x720px
3. Rename file sesuai dengan nama yang diminta (case-sensitive!)

### Langkah 2: Copy File
1. Copy file gambar ke folder `/public/images/personas/`
2. Pastikan nama file **exact match**: `personas-background.jpg` (atau .png/.webp)

### Langkah 3: Refresh Browser
1. Refresh browser dengan hard refresh:
   - **Windows/Linux**: `Ctrl + F5` atau `Ctrl + Shift + R`
   - **Mac**: `Cmd + Shift + R`
2. Atau clear cache browser

### Langkah 4: Verifikasi
1. Buka halaman Personas Section
2. Pastikan gambar muncul dengan benar
3. Check mobile view juga

## Fallback Behavior

Jika gambar belum di-upload:
- ✅ Akan muncul **placeholder badge** (yellow badge) di atas gambar
- ✅ Akan menggunakan **Unsplash placeholder** sebagai fallback
- ✅ Setelah gambar di-upload, badge akan hilang otomatis dan gambar lokal akan digunakan

## Tips & Best Practices

1. **Optimize Gambar Sebelum Upload**:
   - Gunakan [TinyPNG](https://tinypng.com) untuk compress JPG/PNG
   - Gunakan [Squoosh](https://squoosh.app) untuk convert ke WebP

2. **Aspect Ratio**:
   - Gambar **landscape (16:9)** akan tampil paling bagus
   - Gambar portrait akan di-crop center oleh CSS

3. **Naming Convention**:
   - Gunakan **lowercase** untuk semua nama file
   - Gunakan **hyphen (-)** untuk separator
   - Jangan gunakan spaces atau special characters

4. **Testing**:
   - Test di berbagai device (desktop, tablet, mobile)
   - Test di berbagai browser (Chrome, Firefox, Safari)
   - Check loading speed (jangan terlalu besar)

5. **Content Suggestions**:
   - Lifestyle photo dengan berbagai personas menggunakan Wedison
   - Urban scene dengan electric vehicles
   - Professional setting dengan modern transportation
   - Multi-person scene showing diversity of users

## Troubleshooting

### ❌ Gambar Tidak Muncul?

**Checklist:**
1. ✅ Nama file **exact match** (case-sensitive) - contoh: `personas-background.jpg`
2. ✅ File ada di folder `/public/images/personas/` (bukan di subfolder)
3. ✅ Format file supported (jpg, jpeg, png, webp)
4. ✅ File size tidak terlalu besar (<5MB)
5. ✅ Hard refresh browser (Ctrl+F5 atau Cmd+Shift+R)
6. ✅ Check browser console untuk error 404

**Error di Console?**
- Jika muncul `404 Not Found` → cek path file
- Jika muncul `Failed to load resource` → cek format file
- Jika muncul `Image optimization error` → gambar terlalu besar atau format tidak didukung

### ❌ Gambar Terdistorsi?

- Pastikan aspect ratio landscape (16:9 atau 4:3)
- Atau crop gambar ke landscape sebelum upload
- Check CSS `backgroundSize: cover` di komponen

### ❌ Loading Lambat?

- Compress gambar ke <500KB
- Convert ke WebP format (file size lebih kecil)
- Pastikan gambar tidak terlalu besar (max 2560x1440px)

### ❌ Placeholder Badge Tidak Hilang?

- Pastikan gambar benar-benar load (check Network tab di DevTools)
- Hard refresh browser
- Clear browser cache

## Contoh Nama File yang BENAR ✅

```
personas-background.jpg      ✅ Correct
personas-background.png      ✅ Correct
personas-background.webp     ✅ Correct
```

## Contoh Nama File yang SALAH ❌

```
Personas-Background.jpg      ❌ Wrong case
PERSONAS_BACKGROUND.JPG      ❌ Wrong case and separator
personas background.jpg      ❌ Space not allowed
personas-background.png.jpg  ❌ Double extension
```

## Support

Jika masih ada masalah setelah mengikuti semua langkah di atas:
1. Check browser console untuk error messages
2. Check Network tab untuk melihat apakah file benar-benar di-load
3. Pastikan Next.js development server running
4. Restart Next.js server jika perlu

---

**Last Updated**: January 2026
