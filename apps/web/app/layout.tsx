import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Web3Provider } from '@/components/providers/Web3Provider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  )
}
