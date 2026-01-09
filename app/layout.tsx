import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleTagManager from './components/analytics/GoogleTagManager'
import Analytics from './components/analytics/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wedison - Motor Listrik SuperCharge 15 Menit | Jakarta',
  description: 'Charge 10-80% dalam 15 menit! Motor listrik pertama dengan SuperCharge technology. Test drive di showroom Pondok Indah. Cicilan 0% tersedia.',
  keywords: 'motor listrik, electric motorcycle, wedison, supercharge, jakarta, pondok indah, motor listrik indonesia',
  openGraph: {
    title: 'Wedison - Motor Listrik SuperCharge 15 Menit',
    description: 'Charge 10-80% dalam 15 menit! Motor listrik pertama dengan SuperCharge technology.',
    type: 'website',
    locale: 'id_ID',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <GoogleTagManager />
        <Analytics />
        {children}
      </body>
    </html>
  )
}
