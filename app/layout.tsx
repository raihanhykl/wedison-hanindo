import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Wedison - Motor Listrik Hemat BBM | SuperCharge 15 Menit',
    template: '%s | Wedison Motor Listrik',
  },
  description: 'Hemat 60% biaya BBM dengan motor listrik Wedison. SuperCharge 15 menit, cicilan mulai Rp 400rb/bulan. DP 0% tersedia. Subsidi pemerintah Rp 8 juta.',
  keywords: [
    'motor listrik',
    'motor listrik murah',
    'motor listrik indonesia',
    'wedison',
    'supercharge',
    'hemat bbm',
    'motor listrik jakarta',
    'cicilan motor listrik',
    'motor listrik ojol',
    'motor listrik subsidi',
  ],
  authors: [{ name: 'Wedison Indonesia' }],
  creator: 'Wedison Indonesia',
  publisher: 'PT Wedison Indonesia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Wedison - Motor Listrik Hemat BBM | SuperCharge 15 Menit',
    description: 'Hemat 60% biaya BBM dengan motor listrik Wedison. SuperCharge 15 menit, cicilan mulai Rp 400rb/bulan.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Wedison Motor Listrik',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedison - Motor Listrik Hemat BBM',
    description: 'Hemat 60% biaya BBM dengan motor listrik Wedison. SuperCharge 15 menit.',
  },
  alternates: {
    canonical: '/',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0891B2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.className} antialiased text-rendering-optimize`}>
        {children}
      </body>
    </html>
  )
}
