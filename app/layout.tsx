import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'VRK Mart',
    template: '%s | VRK Mart',
  },
  description: 'VRK Mart — Bengaluru\'s trusted lifetime membership grocery platform',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'VRK Mart',
  },
  openGraph: {
    title: 'VRK Mart',
    description: 'Bengaluru\'s trusted lifetime membership grocery platform',
    type: 'website',
    siteName: 'VRK Mart',
  },
  icons: {
    icon: '/icons/favicon.png',
    apple: '/icons/app-icon.png',
  },
}

// Viewport must be exported separately in Next.js 14+
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#1E3A8A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        {children}
        <div id="recaptcha-container"></div>
        <Analytics />
        <SpeedInsights />
      </body>

    </html>
  )
}

