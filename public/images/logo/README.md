# 📸 Logo Wedison

## Lokasi File

Taruh logo Wedison di folder ini:
```
/public/images/logo/
```

## Nama File yang Diperlukan

**Nama file (pilih salah satu sesuai format logo Anda):**
- `wedison-logo.png` ✅ (Recommended - dengan transparent background)
- `wedison-logo.svg` ✅ (Best untuk scalability - vector format)
- `wedison-logo.webp` ✅ (Best untuk file size kecil)
- `wedison-logo.jpg` ✅ (Jika tidak butuh transparent background)

## Format File yang Didukung

- **PNG** (Recommended - dengan transparent background)
- **SVG** (Best untuk scalability, vector format)
- **WebP** (Best untuk file size kecil dengan kualitas tinggi)
- **JPG/JPEG** (Jika tidak butuh transparent background)

## Spesifikasi Logo

### Ukuran (Recommended):
- **Minimum**: 200x200px (square format)
- **Recommended**: 400x400px atau lebih besar
- **Maximum**: 1000x1000px (jangan terlalu besar, akan slow loading)

### File Size:
- **Target**: <100KB per logo
- **Maximum**: <200KB per logo
- **Tip**: Gunakan [TinyPNG](https://tinypng.com) untuk compress PNG/JPG
- **SVG**: Biasanya sudah kecil, tidak perlu compress

### Background:
- **Transparent** (untuk PNG, SVG, WebP) - Recommended untuk tampilan lebih baik
- **Solid color** (untuk JPG) - Jika tidak tersedia versi transparent

### Format Spesifik:
- **PNG**: Transparent background, RGB color mode
- **SVG**: Vector format, scalable tanpa kehilangan kualitas
- **WebP**: Transparent background, file size kecil
- **JPG**: Solid background, file size kecil

## Struktur Folder Final

Setelah menambahkan logo, struktur folder akan seperti ini:

```
/public/images/logo/
  ├── wedison-logo.png      ← Logo utama (Required - pilih salah satu format)
  └── README.md             ← File ini
```

## Cara Menambahkan Logo

### Langkah 1: Siapkan Logo
1. Pastikan logo sudah di-optimize (compress jika perlu)
2. Pastikan ukuran minimum 200x200px
3. Rename file sesuai dengan nama yang diminta (case-sensitive!)

### Langkah 2: Copy File
1. Copy file logo ke folder `/public/images/logo/`
2. Pastikan nama file **exact match**: `wedison-logo.png` (atau format lain)
3. **Hanya perlu 1 file** - pilih format terbaik (PNG, SVG, atau WebP)

### Langkah 3: Refresh Browser
1. Refresh browser dengan hard refresh:
   - **Windows/Linux**: `Ctrl + F5` atau `Ctrl + Shift + R`
   - **Mac**: `Cmd + Shift + R`
2. Atau clear cache browser

### Langkah 4: Verifikasi
1. Cek Navbar (top navigation) - logo harus muncul di kiri atas
2. Cek Footer (bottom) - logo harus muncul di company info section
3. Pastikan logo tidak terdistorsi atau blur

## Usage (Di Mana Logo Digunakan)

Logo akan otomatis muncul di:
- ✅ **Navbar** (top navigation bar)
- ✅ **Footer** (company info section)
- ✅ Bisa digunakan di section lain jika perlu

## Fallback Behavior

Jika logo belum di-upload:
- ✅ Akan muncul **fallback SVG** (stylized 'W' mountain shape)
- ✅ Setelah logo di-upload, akan otomatis replace fallback

## Tips & Best Practices

1. **Pilih Format Terbaik**:
   - **SVG** → Best untuk scalability (logo tetap tajam di semua ukuran)
   - **PNG** → Good untuk transparency, file size sedang
   - **WebP** → Best untuk file size kecil dengan kualitas tinggi
   - **JPG** → Jika tidak butuh transparency

2. **Optimize Logo**:
   - Gunakan [TinyPNG](https://tinypng.com) untuk compress PNG/JPG
   - Gunakan [SVGOMG](https://jakearchibald.github.io/svgomg/) untuk optimize SVG
   - Gunakan [Squoosh](https://squoosh.app) untuk convert ke WebP

3. **Aspect Ratio**:
   - **Square (1:1)** recommended untuk konsistensi
   - Atau sesuai dengan design logo asli

4. **Testing**:
   - Test di berbagai device (desktop, tablet, mobile)
   - Test di berbagai browser (Chrome, Firefox, Safari)
   - Pastikan logo tidak blur atau pixelated

5. **Multiple Sizes (Optional)**:
   - Jika perlu, bisa tambah ukuran lain seperti:
     - `wedison-logo-small.png` (untuk icon kecil)
     - `wedison-logo-large.png` (untuk hero section)

## Troubleshooting

### ❌ Logo Tidak Muncul?

**Checklist:**
1. ✅ Nama file **exact match** (case-sensitive) - contoh: `wedison-logo.png`
2. ✅ File ada di folder `/public/images/logo/` (bukan di subfolder)
3. ✅ Format file supported (png, svg, webp, jpg, jpeg)
4. ✅ File size tidak terlalu besar (<5MB)
5. ✅ Hard refresh browser (Ctrl+F5 atau Cmd+Shift+R)
6. ✅ Check browser console untuk error 404

**Error di Console?**
- Jika muncul `404 Not Found` → cek path file
- Jika muncul `Failed to load resource` → cek format file
- Jika muncul `Image optimization error` → logo terlalu besar atau format tidak didukung

### ❌ Logo Terdistorsi?

- Pastikan aspect ratio sesuai design logo asli
- Gunakan SVG untuk scalability terbaik
- Check CSS `object-contain` di Logo component

### ❌ Logo Terlalu Besar/Kecil?

- Update `sizeClasses` di Logo component
- Atau gunakan prop `size` yang sudah ada: `small`, `medium`, `large`

### ❌ Logo Blur atau Pixelated?

- Gunakan logo dengan resolusi lebih tinggi (400x400px atau lebih)
- Gunakan SVG format untuk vector (tidak akan blur)
- Pastikan logo tidak di-scale terlalu besar dari ukuran asli

## Contoh Nama File yang BENAR ✅

```
wedison-logo.png      ✅ Correct
wedison-logo.svg      ✅ Correct
wedison-logo.webp     ✅ Correct
wedison-logo.jpg      ✅ Correct
```

## Contoh Nama File yang SALAH ❌

```
Wedison-Logo.png      ❌ Wrong case
WEDISON-LOGO.PNG      ❌ Wrong case
wedison logo.png      ❌ Space not allowed
wedison_logo.png      ❌ Wrong separator (use hyphen)
wedison-logo.png.jpg  ❌ Double extension
```

## Support Multiple Formats

Kode sudah support multiple formats. Prioritas:
1. `.png` (akan dicoba pertama)
2. `.svg` (fallback jika PNG tidak ada)
3. `.webp` (fallback jika PNG/SVG tidak ada)
4. `.jpg` (fallback terakhir)

Jika format pertama tidak ditemukan, akan otomatis fallback ke format lain, atau ke SVG fallback jika semua format tidak ditemukan.

## Support

Jika masih ada masalah setelah mengikuti semua langkah di atas:
1. Check browser console untuk error messages
2. Check Network tab untuk melihat apakah file benar-benar di-load
3. Pastikan Next.js development server running
4. Restart Next.js server jika perlu

---

**Last Updated**: January 2026
