import type { Metadata } from 'next'
import { Syne, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'PROBE — Debug your agent before it spends your money',
  description: 'Simulate, trace, and verify AI agent behavior on Base. Catch bad calls before they cost gas.',
  openGraph: {
    title: 'PROBE',
    description: 'Agent debugger for Base network.',
    images: ['/images/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${ibmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
