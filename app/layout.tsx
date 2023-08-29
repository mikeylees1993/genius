import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genius',
  description: 'AI PLatform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">

        <body className={inter.className}>{children}
        <script src="https://kit.fontawesome.com/775c254438.js"  defer></script>
        </body>
      </html>
  </ClerkProvider>
  )
}
