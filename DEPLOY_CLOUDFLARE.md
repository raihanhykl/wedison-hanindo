# 🚀 Panduan Deployment ke Cloudflare Pages

## Nama Project: `wedison-hanindo`

Project ini sudah dikonfigurasi untuk deployment ke Cloudflare Pages menggunakan `@cloudflare/next-on-pages` adapter.

## ✅ Prerequisites

1. **Akun Cloudflare** - Daftar di [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI** - Sudah terinstall sebagai dev dependency
3. **Git Repository** - Kode sudah di-push ke GitHub/GitLab/Bitbucket (opsional, untuk auto-deploy)

## 📋 Langkah-langkah Deployment

### Opsi 1: Deploy via Wrangler CLI (Recommended)

1. **Login ke Cloudflare**
   ```bash
   npx wrangler login
   ```
   Ini akan membuka browser untuk autentikasi Cloudflare.

2. **Build dan Deploy**
   ```bash
   npm run pages:deploy
   ```
   
   Script ini akan:
   - Build Next.js project (`next build`)
   - Convert ke format Cloudflare Pages (`@cloudflare/next-on-pages`)
   - Deploy ke Cloudflare Pages dengan nama project `wedison-hanindo`

3. **Preview Locally (Optional)**
   ```bash
   npm run preview
   ```
   Ini akan memulai local preview server untuk test sebelum deploy.

### Opsi 2: Deploy via Cloudflare Dashboard

1. **Login ke Cloudflare Dashboard**
   - Buka [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pilih "Pages" dari sidebar

2. **Create a New Project**
   - Klik "Create a project"
   - Pilih "Upload assets" atau "Connect to Git" (jika repo sudah ada)

3. **Jika menggunakan "Connect to Git":**
   - Pilih repository (GitHub/GitLab/Bitbucket)
   - **Project name**: `wedison-hanindo`
   - **Framework preset**: Next.js
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: (kosongkan)
   - **Node version**: 18.x atau 20.x

4. **Environment Variables (Opsional)**
   Jika menggunakan environment variables:
   - `NEXT_PUBLIC_GTM_ID` = `GTM-XXXXXXX`
   - `NEXT_PUBLIC_GA4_ID` = `G-XXXXXXXXXX`
   - `NEXT_PUBLIC_FB_PIXEL_ID` = `123456789012345`

5. **Deploy**
   - Klik "Save and Deploy"
   - Tunggu build selesai (~3-5 menit)
   - Website akan live di: `https://wedison-hanindo.pages.dev`

### Opsi 3: Setup GitHub Actions (Auto Deploy)

Buat file `.github/workflows/deploy-cloudflare.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build for Cloudflare Pages
        run: npm run pages:build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: wedison-hanindo
          directory: .vercel/output/static
```

**Setup Secrets di GitHub:**
1. Go to repository → Settings → Secrets and variables → Actions
2. Tambahkan:
   - `CLOUDFLARE_API_TOKEN` - Dapatkan dari Cloudflare Dashboard → My Profile → API Tokens
   - `CLOUDFLARE_ACCOUNT_ID` - Dapatkan dari Cloudflare Dashboard → Right sidebar

## 🔧 Konfigurasi Build

### Build Scripts

- `npm run build` - Build Next.js normal (untuk development)
- `npm run pages:build` - Build untuk Cloudflare Pages (Next.js build + adapter conversion)
- `npm run pages:deploy` - Build dan deploy ke Cloudflare Pages
- `npm run preview` - Preview local build untuk Cloudflare Pages

### Build Output

Setelah `pages:build`, output akan berada di:
- `.vercel/output/static` - Static assets untuk Cloudflare Pages
- `.vercel/output/functions` - Serverless functions (API routes)

## 🌐 Custom Domain

1. **Di Cloudflare Pages Dashboard**
   - Go to project `wedison-hanindo`
   - Klik "Custom domains"
   - Add domain (contoh: `wedison.co` atau `www.wedison.co`)

2. **DNS Configuration**
   - Cloudflare akan auto-configure DNS jika domain sudah di-manage di Cloudflare
   - Atau tambahkan CNAME record pointing ke `wedison-hanindo.pages.dev`

## 🔍 Testing API Routes

API route di `/api/lead` akan berfungsi sebagai Cloudflare Workers Function.

Test setelah deployment:
```bash
curl -X POST https://wedison-hanindo.pages.dev/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "081234567890",
    "location": "Jakarta",
    "program": "Beli"
  }'
```

## 📝 Environment Variables

Jika perlu environment variables, set di Cloudflare Dashboard:
1. Go to project → Settings → Environment variables
2. Add variables untuk:
   - **Production**
   - **Preview** (untuk preview deployments)
   - **Development** (untuk local dev)

Variables yang mungkin diperlukan:
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_FB_PIXEL_ID`

## 🐛 Troubleshooting

### Build Fails

**Error: Cannot find module '@cloudflare/next-on-pages'**
```bash
npm install --save-dev @cloudflare/next-on-pages wrangler --legacy-peer-deps
```

**Error: Next.js version incompatible**
- Pastikan Next.js versi 14.3.0 - 15.5.2
- Atau gunakan `--legacy-peer-deps` saat install

**Build timeout**
- Pastikan Node.js version 18.x atau 20.x
- Check build logs di Cloudflare Dashboard

### API Routes Tidak Berfungsi

- Pastikan API routes menggunakan Next.js App Router format
- Check function logs di Cloudflare Dashboard → Functions
- Pastikan compatibility flags include `nodejs_compat`

### Images Tidak Loading

- Pastikan images ada di `public/images/`
- Check paths di code (harus relative dari root)
- Verify Cloudflare cache settings

## 📊 Post-Deployment Checklist

- [ ] Test semua halaman utama
- [ ] Test navigation dan links
- [ ] Test lead form submission (`/api/lead`)
- [ ] Test WhatsApp links
- [ ] Verify GTM/Analytics tracking (jika digunakan)
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Test custom domain (jika sudah setup)

## 🔗 Links Penting

- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages
- **Next.js on Cloudflare**: https://developers.cloudflare.com/pages/framework-guides/nextjs
- **@cloudflare/next-on-pages**: https://github.com/cloudflare/next-on-pages
- **Project URL**: `https://wedison-hanindo.pages.dev` (setelah deploy)

## 💡 Tips

1. **Performance**: Cloudflare Pages automatically provides:
   - Global CDN
   - Automatic compression
   - Edge caching
   - HTTP/2 and HTTP/3 support

2. **Monitoring**: Check Analytics di Cloudflare Dashboard untuk:
   - Page views
   - Bandwidth usage
   - Function invocations (API routes)

3. **Preview Deployments**: Setiap PR akan auto-generate preview URL untuk testing

---

**Siap untuk deploy!** 🚀

Jalankan `npm run pages:deploy` untuk deploy sekarang, atau setup GitHub Actions untuk auto-deploy setiap push ke main branch.
