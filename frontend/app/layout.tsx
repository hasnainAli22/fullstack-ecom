import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Provider from '@/redux/provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Setup } from '@/components/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Commerce Craft',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Setup />
          <Navbar />
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}