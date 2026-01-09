# 📸 Gambar Infrastructure Section

## Lokasi File

Taruh gambar untuk Infrastructure Section di folder ini:
```
/public/images/infrastructure/
```

## Nama File yang Diperlukan

### Smart Home Charging Background:
**Nama file (pilih salah satu):**
- `smart-home-charging.jpg` ✅ (Recommended)
- `smart-home-charging.png`
- `smart-home-charging.webp`

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
- **High quality** image yang menunjukkan:
  - Home charging station/charger
  - Wall-mounted charger
  - Indoor charging setup
  - Modern, clean, professional look
- **Background**: Bisa solid color atau gradient
- **Content**: Foto charger di rumah, wall-mounted charger, atau setup charging di rumah
- **Resolution**: Minimum 72 DPI (untuk web)
- **Orientation**: Landscape (16:9 atau 4:3)

## Struktur Folder Final

Setelah menambahkan gambar, struktur folder akan seperti ini:

```
/public/images/infrastructure/
  ├── smart-home-charging.jpg    ← Background image (Required)
  └── README.md                  ← File ini
```

## Cara Menambahkan Gambar

### Langkah 1: Siapkan Gambar
1. Pastikan gambar sudah di-optimize (compress)
2. Pastikan ukuran minimum 1280x720px
3. Rename file sesuai dengan nama yang diminta (case-sensitive!)

### Langkah 2: Copy File
1. Copy file gambar ke folder `/public/images/infrastructure/`
2. Pastikan nama file **exact match**: `smart-home-charging.jpg` (atau .png/.webp)

### Langkah 3: Refresh Browser
1. Refresh browser dengan hard refresh:
   - **Windows/Linux**: `Ctrl + F5` atau `Ctrl + Shift + R`
   - **Mac**: `Cmd + Shift + R`
2. Atau clear cache browser

### Langkah 4: Verifikasi
1. Buka halaman Infrastructure Section
2. Scroll ke bagian "Smart Home Charging"
3. Pastikan gambar muncul dengan benar
4. Check mobile view juga

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
   - Photo wall-mounted electric vehicle charger
   - Home charging station setup
   - Indoor charging setup dengan kabel
   - Modern, clean charger installation
   - Professional charging equipment

## Troubleshooting

### ❌ Gambar Tidak Muncul?

**Checklist:**
1. ✅ Nama file **exact match** (case-sensitive) - contoh: `smart-home-charging.jpg`
2. ✅ File ada di folder `/public/images/infrastructure/` (bukan di subfolder)
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
smart-home-charging.jpg      ✅ Correct
smart-home-charging.png      ✅ Correct
smart-home-charging.webp     ✅ Correct
```

## Contoh Nama File yang SALAH ❌

```
Smart-Home-Charging.jpg      ❌ Wrong case
SMART_HOME_CHARGING.JPG      ❌ Wrong case and separator
smart home charging.jpg      ❌ Space not allowed
smart-home-charging.png.jpg  ❌ Double extension
```

## Support

Jika masih ada masalah setelah mengikuti semua langkah di atas:
1. Check browser console untuk error messages
2. Check Network tab untuk melihat apakah file benar-benar di-load
3. Pastikan Next.js development server running
4. Restart Next.js server jika perlu

---

**Last Updated**: January 2026
