import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VerifiNet Crisis Hub',
  description: 'Journalist verification dashboard for crisis reporting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="navbar">
          <div className="logo">VerifiNet</div>
          <ul>
            <li><Link className="tab-btn" href="/portal/verify">Verify</Link></li>
            <li><Link className="tab-btn" href="/portal/tip-submission">Submit Tip</Link></li>
            <li><Link className="tab-btn" href="/portal/crisis-map">Crisis Map</Link></li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
} 