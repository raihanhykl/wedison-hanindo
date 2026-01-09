# Instruksi Upload Gambar Hero Slider

## Langkah-Langkah Upload

### 1. Buka Folder Ini
Folder ini berada di: `public/images/hero-slider/`

### 2. Upload 4 Gambar dengan Nama File Berikut:

#### Gambar 1 - Slide Sewa
- **Nama File**: `hero-sewa.jpg` (atau `.png`, `.webp`)
- **Gambar**: Promo sewa dengan orang dan scooter, text "SEWA", "Rp 50 Per Hari"
- **Format**: JPG, PNG, atau WebP

#### Gambar 2 - Slide Beli/Subsidi
- **Nama File**: `hero-beli-subsidi.jpg` (atau `.png`, `.webp`)
- **Gambar**: Promo beli dengan couple di scooter, subsidi 8 juta, promo CIMB Niaga, Kredivo
- **Format**: JPG, PNG, atau WebP

#### Gambar 3 - Slide Voucher Charging
- **Nama File**: `hero-voucher-charging.jpg` (atau `.png`, `.webp`)
- **Gambar**: Promo voucher charging dengan pria di scooter dan charging station, "Rp 3 jt untuk Cash" atau "500 Ribu untuk Sewa"
- **Format**: JPG, PNG, atau WebP

#### Gambar 4 - Slide Models
- **Nama File**: `hero-models.jpg` (atau `.png`, `.webp`)
- **Gambar**: Dark blue scooter di winter landscape (gambar hero yang sudah ada)
- **Format**: JPG, PNG, atau WebP

## Cara Upload

### Option 1: Drag & Drop (Termudah)
1. Buka Finder (Mac) atau File Explorer (Windows)
2. Navigasi ke folder: `public/images/hero-slider/`
3. Drag & drop gambar dari komputer ke folder ini
4. Rename file sesuai nama di atas

### Option 2: Copy & Paste
1. Copy gambar dari komputer
2. Buka folder: `public/images/hero-slider/`
3. Paste gambar ke folder
4. Rename file sesuai nama di atas

### Option 3: Via Terminal
```bash
# Navigasi ke folder project
cd "/Users/mrzstn/Desktop/1. Web Apps/10. Wedison 2"

# Pastikan folder ada
mkdir -p public/images/hero-slider

# Copy gambar ke folder (ganti path dengan path gambar Anda)
# cp ~/Downloads/gambar-sewa.jpg public/images/hero-slider/hero-sewa.jpg
# cp ~/Downloads/gambar-beli.jpg public/images/hero-slider/hero-beli-subsidi.jpg
# cp ~/Downloads/gambar-voucher.jpg public/images/hero-slider/hero-voucher-charging.jpg
# cp ~/Downloads/gambar-model.jpg public/images/hero-slider/hero-models.jpg
```

## Spesifikasi Gambar

- **Format**: JPG, PNG, atau WebP (WebP direkomendasikan untuk performa terbaik)
- **Ukuran**: 1920x1080px atau lebih besar (rasio 16:9)
- **File Size**: <500KB per gambar (optimize untuk loading cepat)
- **Aspect Ratio**: 16:9 (landscape)

## Setelah Upload

1. Gambar akan otomatis muncul di hero slider
2. Badge placeholder akan hilang otomatis
3. Jika gambar tidak ditemukan, akan fallback ke Unsplash (temporary)

## Tools Optimasi Gambar

- [TinyPNG](https://tinypng.com/) - Compress PNG/JPG
- [Squoosh](https://squoosh.app/) - Convert ke WebP & optimize
- Photoshop / Figma - Resize & optimize

## Struktur File Setelah Upload

```
public/images/hero-slider/
├── hero-sewa.jpg (Gambar 1)
├── hero-beli-subsidi.jpg (Gambar 2)
├── hero-voucher-charging.jpg (Gambar 3)
├── hero-models.jpg (Gambar 4)
├── README.md
└── UPLOAD_INSTRUCTIONS.md (file ini)
```
