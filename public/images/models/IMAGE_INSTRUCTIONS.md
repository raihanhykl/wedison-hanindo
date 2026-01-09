# 📸 Cara Menambahkan Gambar Model

## Lokasi File Gambar

Taruh gambar model detail di folder berikut:

```
/public/images/models/
```

## Nama File yang Diperlukan

Setiap model membutuhkan file dengan nama **exact** berikut:

1. **EdPower**: `edpower-detail.jpg`
2. **Athena**: `athena-detail.jpg`
3. **Victory**: `victory-detail.jpg`
4. **Mini**: `mini-detail.jpg`

## Spesifikasi Gambar

- **Format**: JPG, PNG, atau WebP
- **Ukuran**: 1000x1000px (square, 1:1 aspect ratio)
- **Minimum**: 800x800px
- **File Size**: <300KB (optimize untuk loading cepat)
- **Background**: Transparent atau solid color
- **Content**: High-quality product shot dari setiap model

## Struktur Folder

```
/public/images/models/
  ├── edpower-detail.jpg      ← Gambar EdPower
  ├── athena-detail.jpg       ← Gambar Athena
  ├── victory-detail.jpg      ← Gambar Victory
  ├── mini-detail.jpg         ← Gambar Mini
  └── IMAGE_INSTRUCTIONS.md   ← File ini
```

## Cara Kerja

1. **Tambahkan gambar** dengan nama file yang sesuai
2. **Refresh browser** (Ctrl+F5 atau Cmd+Shift+R)
3. **Gambar akan otomatis muncul** di Models Tab Section
4. **Setiap tab** akan menampilkan gambar model yang sesuai

## Fallback

Jika gambar belum ada:
- Akan muncul placeholder dengan instruksi
- Placeholder menunjukkan path file yang diperlukan
- Setelah gambar ditambahkan, akan otomatis replace placeholder

## Tips

- Gunakan image optimization tool (TinyPNG, ImageOptim)
- Pastikan aspect ratio 1:1 (square)
- Test di berbagai device untuk memastikan responsive
- Gunakan format WebP untuk file size lebih kecil

## Troubleshooting

**Gambar tidak muncul?**
1. Cek nama file harus **exact match** (case-sensitive)
2. File harus di folder `/public/images/models/`
3. Refresh browser dengan hard refresh
4. Cek browser console untuk error 404

**Gambar terdistorsi?**
- Pastikan aspect ratio 1:1 (square)
- Atau crop gambar ke square sebelum upload
