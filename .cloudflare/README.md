# Cloudflare Pages Deployment Guide

## Prerequisites

1. **Cloudflare Account** - Sign up at [cloudflare.com](https://cloudflare.com)
2. **Git Repository** - Push your code to GitHub, GitLab, or Bitbucket
3. **Node.js 18+** - For local testing (Cloudflare will handle this automatically)

## Deployment Options

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Login to Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Select "Pages" from the sidebar

2. **Create a New Project**
   - Click "Create a project"
   - Connect your Git repository (GitHub/GitLab/Bitbucket)
   - Select your repository

3. **Configure Build Settings**
   - **Framework preset**: Next.js (auto-detected)
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: (leave empty)
   - **Node version**: 18.x (or latest)

4. **Environment Variables** (Optional)
   - Add if you're using environment variables:
     - `NEXT_PUBLIC_GTM_ID` = `GTM-XXXXXXX`
     - `NEXT_PUBLIC_GA4_ID` = `G-XXXXXXXXXX`
     - `NEXT_PUBLIC_FB_PIXEL_ID` = `123456789012345`

5. **Deploy**
   - Click "Save and Deploy"
   - Wait for build to complete (usually 2-5 minutes)
   - Your site will be live at `https://your-project.pages.dev`

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   wrangler pages deploy .next --project-name=wedison-landing
   ```

### Option 3: Use GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy-cloudflare.yml`:

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
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: wedison-landing
          directory: .next
```

## Important Notes

### Next.js on Cloudflare Pages

Cloudflare Pages supports Next.js, but note:

1. **Static Export** - For full compatibility, you may need to use static export:
   ```js
   // next.config.js
   output: 'export'
   ```
   But this will disable:
   - API routes
   - Server-side rendering (SSR)
   - Dynamic routes (without generateStaticParams)

2. **Current Setup** - Your current setup uses:
   - App Router (Next.js 14)
   - API routes (`/api/lead`)
   - Static pages (most of your pages)

### For Full Next.js Features

If you need full Next.js features (SSR, API routes), consider:
- Using Vercel (native Next.js hosting)
- Or using Cloudflare Workers with Next.js adapter

### Current Configuration

Your current `next.config.js`:
- ✅ Static pages will work
- ✅ API routes should work (check `/api/lead`)
- ⚠️ If API routes don't work, consider moving to serverless function or external API

## Custom Domain

1. **In Cloudflare Pages Dashboard**
   - Go to your project
   - Click "Custom domains"
   - Add your domain (e.g., `wedison.co`)
   - Follow DNS setup instructions

2. **Update DNS Records**
   - Add CNAME record pointing to your Pages domain
   - Or use Cloudflare's automatic DNS management

## Environment Variables

If you need to set environment variables:

1. **In Cloudflare Pages Dashboard**
   - Go to your project → Settings → Environment variables
   - Add variables for Production, Preview, and Development

2. **Required Variables** (if using):
   - `NEXT_PUBLIC_GTM_ID`
   - `NEXT_PUBLIC_GA4_ID`
   - `NEXT_PUBLIC_FB_PIXEL_ID`

## Build Output

After successful build:
- Static pages: Generated in `.next/static`
- API routes: Should work if supported
- Images: Optimized and served from `/images/`

## Troubleshooting

### Build Fails
- Check Node.js version (use 18.x)
- Check for missing dependencies
- Review build logs in Cloudflare dashboard

### API Routes Not Working
- Cloudflare Pages may have limitations with API routes
- Consider moving to external API or serverless function
- Or use static export if API not needed

### Images Not Loading
- Check if images are in `public/images/`
- Verify image paths are correct
- Check Cloudflare cache settings

## Performance Tips

1. **Enable Caching**
   - Cloudflare Pages automatically caches static assets
   - Consider enabling Cloudflare CDN for better performance

2. **Optimize Images**
   - Your images are already in WebP format (good!)
   - Consider using Cloudflare Images for additional optimization

3. **Enable Compression**
   - Cloudflare automatically compresses responses
   - Check "Speed" tab in Cloudflare dashboard

## Support

For issues:
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages
- Next.js on Cloudflare: https://developers.cloudflare.com/pages/framework-guides/nextjs
