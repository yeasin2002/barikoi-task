import { ThemeProvider } from '@/components/shared/theme-provider'
import StoreProvider from '@/lib/store-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type React from 'react'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

// Todo: Make sure to change according to your/project needs
export const metadata: Metadata = {
  title: {
    default: 'Next.js Boilerplate',
    template: '%s | Next.js Boilerplate',
  },
  description: 'A comprehensive Next.js boilerplate with modern tooling',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Next.js Boilerplate',
    description: 'A comprehensive Next.js boilerplate with modern tooling',
    siteName: 'Next.js Boilerplate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Boilerplate',
    description: 'A comprehensive Next.js boilerplate with modern tooling',
    creator: '@yourusername',
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
