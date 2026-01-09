# 📸 Gambar Model Wedison

## Lokasi File

Taruh semua gambar model di folder ini:
```
/public/images/models/
```

## Nama File yang Diperlukan

Setiap model membutuhkan file dengan nama **exact** berikut (case-sensitive):

### Model Regular:
1. **EdPower**: `edpower.jpg`
2. **Athena**: `athena.jpg`
3. **Victory**: `victory.jpg`
4. **Mini**: `mini.jpg`

### Model Extended (Optional):
5. **Athena Extended**: `athena-extended.jpg`
6. **Victory Extended**: `victory-extended.jpg`

## Format File yang Didukung

- **JPG/JPEG** (Recommended - file size lebih kecil)
- **PNG** (Jika butuh transparansi)
- **WebP** (Best untuk web - file size sangat kecil)

## Spesifikasi Gambar

### Ukuran (Recommended):
- **Desktop**: 1200x1200px (square, 1:1 aspect ratio)
- **Mobile**: 1200x1200px (square, 1:1 aspect ratio)
- **Minimum**: 800x800px
- **Maximum**: 2000x2000px (jangan terlalu besar, akan slow loading)

### File Size:
- **Target**: <300KB per gambar
- **Maximum**: <500KB per gambar
- **Tip**: Gunakan [TinyPNG](https://tinypng.com) atau [ImageOptim](https://imageoptim.com) untuk compress

### Kualitas Gambar:
- **High quality** product shot dari setiap model
- **Background**: Transparent (PNG) atau solid color (JPG)
- **Resolution**: Minimum 72 DPI (untuk web)
- **Orientation**: Square (1:1) atau bisa portrait/landscape tapi akan di-crop ke square

## Struktur Folder Final

Setelah menambahkan semua gambar, struktur folder akan seperti ini:

```
/public/images/models/
  ├── edpower.jpg              ← Gambar EdPower (Required)
  ├── athena.jpg               ← Gambar Athena (Required)
  ├── athena-extended.jpg      ← Gambar Athena Extended (Optional)
  ├── victory.jpg              ← Gambar Victory (Required)
  ├── victory-extended.jpg     ← Gambar Victory Extended (Optional)
  ├── mini.jpg                 ← Gambar Mini (Required)
  ├── README.md                ← File ini
  └── IMAGE_INSTRUCTIONS.md    ← Instruksi detail (optional)
```

## Cara Menambahkan Gambar

### Langkah 1: Siapkan Gambar
1. Pastikan gambar sudah di-optimize (compress)
2. Pastikan ukuran minimum 800x800px
3. Rename file sesuai dengan nama yang diminta (case-sensitive!)

### Langkah 2: Copy File
1. Copy file gambar ke folder `/public/images/models/`
2. Pastikan nama file **exact match** (edpower.jpg, bukan EdPower.jpg atau EDPOWER.jpg)

### Langkah 3: Refresh Browser
1. Refresh browser dengan hard refresh:
   - **Windows/Linux**: `Ctrl + F5` atau `Ctrl + Shift + R`
   - **Mac**: `Cmd + Shift + R`
2. Atau clear cache browser

### Langkah 4: Verifikasi
1. Buka halaman Models Tab Section
2. Klik tab setiap model
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
   - Gambar **square (1:1)** akan tampil paling bagus
   - Gambar portrait/landscape akan di-crop center oleh CSS

3. **Naming Convention**:
   - Gunakan **lowercase** untuk semua nama file
   - Gunakan **hyphen (-)** untuk extended versions
   - Jangan gunakan spaces atau special characters

4. **Testing**:
   - Test di berbagai device (desktop, tablet, mobile)
   - Test di berbagai browser (Chrome, Firefox, Safari)
   - Check loading speed (jangan terlalu besar)

5. **Regular vs Extended**:
   - Jika Extended version pakai gambar yang sama, bisa copy file:
     - `cp athena.jpg athena-extended.jpg`
   - Atau buat gambar berbeda untuk highlight perbedaannya

## Troubleshooting

### ❌ Gambar Tidak Muncul?

**Checklist:**
1. ✅ Nama file **exact match** (case-sensitive) - contoh: `edpower.jpg` bukan `EdPower.jpg`
2. ✅ File ada di folder `/public/images/models/` (bukan di subfolder)
3. ✅ Format file supported (jpg, jpeg, png, webp)
4. ✅ File size tidak terlalu besar (<5MB)
5. ✅ Hard refresh browser (Ctrl+F5 atau Cmd+Shift+R)
6. ✅ Check browser console untuk error 404

**Error di Console?**
- Jika muncul `404 Not Found` → cek path file
- Jika muncul `Failed to load resource` → cek format file
- Jika muncul `Image optimization error` → gambar terlalu besar atau format tidak didukung

### ❌ Gambar Terdistorsi?

- Pastikan aspect ratio 1:1 (square)
- Atau crop gambar ke square sebelum upload
- Check CSS `object-cover` di komponen

### ❌ Loading Lambat?

- Compress gambar ke <300KB
- Convert ke WebP format (file size lebih kecil)
- Pastikan gambar tidak terlalu besar (max 2000x2000px)

### ❌ Placeholder Badge Tidak Hilang?

- Pastikan gambar benar-benar load (check Network tab di DevTools)
- Hard refresh browser
- Clear browser cache

## Contoh Nama File yang BENAR ✅

```
edpower.jpg              ✅ Correct
athena.jpg               ✅ Correct
athena-extended.jpg      ✅ Correct
victory.jpg              ✅ Correct
mini.jpg                 ✅ Correct
```

## Contoh Nama File yang SALAH ❌

```
EdPower.jpg              ❌ Wrong case
EDPOWER.JPG              ❌ Wrong case
athena_extended.jpg      ❌ Wrong separator (use hyphen)
athena extended.jpg      ❌ Space not allowed
edpower.png.jpg          ❌ Double extension
edpower.jpg.webp         ❌ Wrong format
```

## Support

Jika masih ada masalah setelah mengikuti semua langkah di atas:
1. Check browser console untuk error messages
2. Check Network tab untuk melihat apakah file benar-benar di-load
3. Pastikan Next.js development server running
4. Restart Next.js server jika perlu

---

**Last Updated**: January 2026
