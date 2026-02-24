import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "EduReview — See who's learning, not just who's passing",
  description: 'Student engagement and growth visibility for schools and universities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        {/* Satoshi via Fontshare CDN — variable font, all weights */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
