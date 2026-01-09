# 🚀 Quick Deploy Guide - Cloudflare Pages

## Build Status: ✅ Ready

Project sudah di-build dengan sukses dan siap untuk deployment!

## Quick Deploy (5 Menit)

### Step 1: Push ke Git Repository

```bash
git init
git add .
git commit -m "Initial commit - Wedison Landing Page"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### Step 2: Deploy via Cloudflare Dashboard

1. **Login ke Cloudflare**
   - Buka [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pilih "Pages" dari sidebar

2. **Create Project**
   - Klik "Create a project"
   - Pilih "Connect to Git"
   - Connect repository Anda (GitHub/GitLab/Bitbucket)

3. **Build Settings** (Auto-detected untuk Next.js)
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Root directory: *(kosongkan)*
   - Node version: **18.x**

4. **Environment Variables** (Opsional - jika perlu)
   ```
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
   ```

5. **Deploy!**
   - Klik "Save and Deploy"
   - Tunggu build selesai (~2-5 menit)
   - Website live di: `https://your-project.pages.dev`

## ⚠️ Important Notes

### API Routes

Proyek ini memiliki API route di `/api/lead` untuk lead form submission. 

**Cloudflare Pages Limitation:**
- Cloudflare Pages menggunakan static hosting
- API routes (Server-side) mungkin **tidak bekerja** di Cloudflare Pages
- Jika API routes tidak bekerja, ada beberapa solusi:

#### Option 1: Use External Email Service (Recommended)
- Update `LeadFormSection` untuk submit langsung ke email service (Resend, SendGrid, dll)
- Atau redirect ke WhatsApp dengan pre-filled message

#### Option 2: Use Cloudflare Workers
- Convert API route menjadi Cloudflare Worker
- Deploy sebagai separate worker

#### Option 3: Use Static Export
- Remove API routes
- Update `next.config.js` dengan `output: 'export'`
- Use client-side form submission (WhatsApp redirect)

### Current Setup

Build sudah sukses dengan:
- ✅ Static pages (semua pages utama)
- ✅ App Router (Next.js 14)
- ⚠️ API routes (perlu test di Cloudflare)

## Test Build Locally

```bash
# Build
npm run build

# Test production build
npm run start

# Buka http://localhost:3000
```

## Deployment Checklist

- [x] Build successful (`npm run build`)
- [x] All pages compile without errors
- [x] Images optimized
- [ ] Git repository ready
- [ ] Cloudflare account created
- [ ] Environment variables set (jika perlu)
- [ ] Custom domain configured (opsional)
- [ ] Test API routes (jika digunakan)
- [ ] Test all forms and links
- [ ] Update GTM_ID di production environment

## Post-Deployment

1. **Test Website**
   - Visit live URL
   - Test all sections
   - Test WhatsApp links
   - Test navigation

2. **Setup GTM/Analytics**
   - Update GTM_ID di Cloudflare environment variables
   - Verify tracking works
   - Check GA4 real-time reports

3. **Test Lead Form**
   - Test form submission
   - Verify email received (jika sudah setup email service)
   - Check console for errors

4. **Performance Check**
   - Run Lighthouse audit
   - Check page load speed
   - Optimize images if needed

## Troubleshooting

### Build Fails
- Check Node.js version (use 18.x)
- Review build logs
- Check for missing dependencies

### API Routes Not Working
- Cloudflare Pages doesn't support Next.js API routes natively
- Consider using external service or Cloudflare Workers
- Or switch to static export

### Images Not Loading
- Check if images are in `public/images/`
- Verify paths are correct
- Check Cloudflare cache settings

### GTM Not Loading
- Check environment variables
- Verify GTM_ID is correct
- Check browser console for errors

## Alternative Hosting

Jika Cloudflare Pages tidak sesuai kebutuhan:

1. **Vercel** (Recommended untuk Next.js)
   - Native Next.js support
   - Full API routes support
   - Zero config deployment
   - Free tier available

2. **Netlify**
   - Good Next.js support
   - Serverless functions
   - Easy deployment

3. **AWS Amplify**
   - Enterprise-grade
   - Full Next.js features
   - More complex setup

## Support

- **Cloudflare Docs**: https://developers.cloudflare.com/pages
- **Next.js Docs**: https://nextjs.org/docs
- **Project Issues**: Check GitHub issues or contact developer

---

**Ready to deploy!** 🚀
