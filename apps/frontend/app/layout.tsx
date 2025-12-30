import { Navbar } from '@/components/Navbar'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from './providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Chainlink Sportsbook',
    description: 'Micro-bets with x402 + Chainlink on Cronos',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Navbar />
                    <main className="min-h-screen">{children}</main>
                    <Toaster />
                </Providers>
            </body>
        </html>
    )
}
