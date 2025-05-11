import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PeerPlay',
  description: 'Distance never disrupts the joy of watching together with PeerPlay  ',
  applicationName: 'PeerPlay',
  authors: { name: "John Oba", url: 'https://github.com/johnexzy'},
  keywords: ["PeerPlay", "RealTime Video Watching"],
  openGraph: {images: "https://res.cloudinary.com/dpq6dieap/image/upload/f_auto,q_auto/v1/peerplay/wxyq5nprra168utmm9re"}

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
