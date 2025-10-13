import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'ElevateCover - Professional LinkedIn Banner Generator',
  description:
    'Create high-impact, brand-aligned LinkedIn cover images instantly. Customize colors, text, and graphics to communicate your unique value proposition.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' }
    ]
  },
  openGraph: {
    title: 'ElevateCover - Professional LinkedIn Banner Generator',
    description:
      'Create high-impact, brand-aligned LinkedIn cover images instantly. Customize colors, text, and graphics to communicate your unique value proposition.',
    type: 'website',
    url: 'https://elevate-cover.vercel.app',
    siteName: 'ElevateCover',
    images: [
      {
        url: 'https://elevate-cover.vercel.app/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ElevateCover - Professional LinkedIn Banner Generator',
        type: 'image/png'
      }
    ],
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElevateCover - Professional LinkedIn Banner Generator',
    description:
      'Create high-impact, brand-aligned LinkedIn cover images instantly. Customize colors, text, and graphics to communicate your unique value proposition.',
    images: ['https://elevate-cover.vercel.app/images/og-image.png']
  },
  metadataBase: new URL('https://elevate-cover.vercel.app'),
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
