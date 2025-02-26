import React from 'react';
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Facebook Lead Forms Manager',
  description: 'Modern tool to manage and download your Facebook lead form data',
  keywords: 'facebook, leads, forms, manager, download, marketing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full ${outfit.variable}`}>
      <body className={`${outfit.className} min-h-screen bg-gradient-to-b from-gray-50 to-white`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </body>
    </html>
  )
}
