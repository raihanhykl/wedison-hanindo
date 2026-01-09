# 🔧 Fix CSS Not Loading Issue

## Masalah
Halaman hanya menampilkan teks tanpa styling (CSS/Tailwind tidak ter-load).

## Solusi

### 1. Stop Dev Server
```bash
# Tekan Ctrl+C di terminal yang menjalankan `npm run dev`
```

### 2. Clear Semua Cache
```bash
# Clear Next.js build cache
rm -rf .next

# Clear node_modules cache
rm -rf node_modules/.cache

# Clear npm cache (optional)
npm cache clean --force
```

### 3. Restart Dev Server
```bash
npm run dev
```

### 4. Clear Browser Cache
Di browser Anda:
1. **Chrome/Edge**: Tekan `Ctrl+Shift+Delete` (Windows) atau `Cmd+Shift+Delete` (Mac)
   - Pilih "Cached images and files"
   - Time range: "All time"
   - Klik "Clear data"

2. **Atau gunakan Hard Refresh**:
   - **Windows**: `Ctrl + Shift + R` atau `Ctrl + F5`
   - **Mac**: `Cmd + Shift + R`

3. **Atau buka dalam Incognito/Private Mode** untuk test

### 5. Cek Browser Console
Tekan `F12` atau `Cmd+Option+I` untuk buka Developer Tools:
- Cek tab **Console** untuk error
- Cek tab **Network** untuk memastikan CSS files ter-load
  - Filter: CSS
  - Pastikan status 200 (OK)

### 6. Jika Masih Tidak Berfungsi

**Check CSS file di Network tab:**
- Cari file: `/_next/static/css/...`
- Status harus 200 OK
- Jika 404, ada masalah dengan build

**Verify Tailwind Processing:**
```bash
# Build untuk production
npm run build

# Test production build
npm run start
# Buka http://localhost:3000
```

Jika production build berfungsi tapi dev tidak, kemungkinan masalah dengan dev server.

### 7. Full Reset (Last Resort)

```bash
# Stop dev server (Ctrl+C)

# Remove node_modules dan lock file
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Clear cache
rm -rf .next node_modules/.cache

# Restart dev server
npm run dev
```

## Troubleshooting

### Error: "Cannot find module 'tailwindcss'"
```bash
npm install --save-dev tailwindcss postcss autoprefixer
```

### Error: "PostCSS plugin error"
```bash
# Verify postcss.config.js exists and is correct
cat postcss.config.js
```

### CSS Classes Tidak Berfungsi
1. Cek `tailwind.config.ts` - pastikan content paths benar
2. Cek apakah class name ada typo
3. Pastikan Tailwind directives ada di `globals.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## Verifikasi

Setelah restart, halaman seharusnya menampilkan:
- ✅ Background colors
- ✅ Proper fonts (Inter)
- ✅ Spacing dan layout
- ✅ Buttons dengan styling
- ✅ Colors (electric-blue, teal, orange)

Jika masih hanya teks tanpa styling, cek browser console untuk error spesifik.
