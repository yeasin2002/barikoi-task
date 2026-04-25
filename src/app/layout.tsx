import { ThemeProvider } from '@/components/shared/theme-provider'
import StoreProvider from '@/redux/store-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type React from 'react'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })
const siteName = 'Barikoi Location Finder'
const siteDescription = 'Search places in Bangladesh and view them on a Barikoi-powered map.'
const siteUrl = process.env.NEXT_PUBLIC_APP_URL

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ['Barikoi', 'location finder', 'Bangladesh', 'map search', 'autocomplete'],
  authors: [{ name: 'Yeasin' }],
  creator: 'Yeasin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: siteName,
    description: siteDescription,
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    creator: '@yeasin2002',
  },
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
}
