# 🚀 Wedison Interactive Landing Page

Modern, high-performance landing page for Wedison electric motorcycles featuring SuperCharge technology.

## ✨ Features

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **Mobile-first** responsive design
- **WhatsApp integration** for lead generation
- **Interactive sections**:
  - Hero with animated charging indicators
  - Problem/Solution comparison
  - Target persona cards
  - Showroom information with maps
  - Tabbed specifications
  - Infrastructure network visualization
  - Video testimonials carousel
  - FAQ accordion
  - Final CTA with special offers

## 🎨 Design System

- **Primary Color**: Electric Blue (#0891B2)
- **Secondary Color**: Teal (#06B6D4)
- **Accent**: Orange (#F97316)
- **Typography**: Inter font family
- **Animations**: Smooth Framer Motion transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Sticky navigation bar
│   │   │   └── Footer.tsx          # Footer with links
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # Hero with CTA
│   │   │   ├── ProblemSection.tsx  # Problem/Solution
│   │   │   ├── PersonasSection.tsx # Target personas
│   │   │   ├── ShowroomSection.tsx # Showroom info
│   │   │   ├── SpecsSection.tsx    # Technical specs
│   │   │   ├── InfrastructureSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   └── FinalCTASection.tsx
│   │   └── ui/
│   │       ├── Button.tsx          # Reusable button
│   │       ├── Card.tsx            # Card component
│   │       ├── AccordionItem.tsx   # FAQ accordion
│   │       └── TabsComponent.tsx   # Tabbed interface
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Main page
├── utils/
│   ├── constants.ts                # Brand constants
│   ├── whatsappLinks.ts           # WhatsApp integration
│   └── analytics.ts               # Analytics setup
└── public/                        # Static assets (add images here)
```

## 🔧 Configuration

### WhatsApp Integration

Update the WhatsApp number in `utils/whatsappLinks.ts`:

```typescript
const WHATSAPP_NUMBER = '62XXXXXXXXXX' // Replace with actual number
```

### Contact Information

Update contact details in `utils/constants.ts`:

```typescript
export const CONTACT = {
  phone: '+62-XXX-XXXX-XXXX',
  whatsapp: '+62XXXXXXXXXX',
  email: 'contact@wedison.co',
  showroomAddress: 'Jl. Arteri Pondok Indah No. 30A-C, Jakarta Selatan',
  // ...
}
```

### Google Analytics

Add your GTM ID in `utils/analytics.ts`:

```typescript
export const GTM_ID = 'GTM-XXXXXXX' // Replace with actual GTM ID
```

## 📸 Adding Images/Videos

1. Place images in `public/images/`
2. Place videos in `public/videos/`
3. Update component imports to use actual assets

### Hero Background

Replace placeholder in `HeroSection.tsx` with:

```tsx
<Image
  src="/images/hero-wedison.jpg"
  alt="Wedison Electric Motorcycle"
  fill
  className="object-cover"
  priority
/>
```

### Showroom Gallery

Add photos to `public/images/showroom/` and update `ShowroomSection.tsx`

## 🎯 Key Conversion Points

1. **Navbar WhatsApp Button** - Always visible
2. **Hero CTA** - Primary conversion point
3. **Floating WhatsApp** - Mobile sticky button
4. **Showroom Test Drive** - Secondary conversion
5. **Final CTA Section** - Last conversion opportunity

## 📱 Mobile Optimization

- Mobile-first design approach
- Touch-friendly buttons (min 48px)
- Hamburger menu for navigation
- Floating WhatsApp button
- Swipeable carousels
- Optimized images with lazy loading

## ⚡ Performance

- Lighthouse score target: 80+
- Image optimization with Next.js Image
- Lazy loading for off-screen content
- Code splitting for sections
- Framer Motion with reduced motion support

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
npm run build
```

## 📝 TODO Before Launch

- [ ] Replace placeholder images with actual photos
- [ ] Add real WhatsApp number
- [ ] Configure Google Analytics/GTM
- [ ] Add Google Maps API key for showroom
- [ ] Upload testimonial videos
- [ ] Test all WhatsApp links
- [ ] Optimize images (WebP format)
- [ ] Test on multiple devices
- [ ] Set up custom domain

## 🤝 Contributing

This is a production-ready landing page. For modifications:

1. Update component files in `app/components/`
2. Modify styles in `tailwind.config.ts` or `globals.css`
3. Update content in `utils/constants.ts`
4. Test responsive design at all breakpoints

## 📄 License

© 2026 PT Wedison Indonesia. All rights reserved.

## 🆘 Support

For technical support or questions:
- Email: contact@wedison.co
- WhatsApp: [Business Number]

---

Built with ⚡ by Wedison Team
