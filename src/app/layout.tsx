import type { Metadata } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MacroCycle AI - AI Macro Trading Dashboard',
  description: 'AI macro trader trained on global cycles and narrative shocks — optimized for prediction markets',
  keywords: ['AI', 'macro trading', 'prediction markets', 'quantitative analysis', 'finance'],
  authors: [{ name: 'MiniMax Agent' }],
  creator: 'MiniMax Agent',
  publisher: 'MacroCycle AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://macrocycle-ai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://macrocycle-ai.com',
    title: 'MacroCycle AI - AI Macro Trading Dashboard',
    description: 'AI macro trader trained on global cycles and narrative shocks — optimized for prediction markets',
    siteName: 'MacroCycle AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MacroCycle AI Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MacroCycle AI - AI Macro Trading Dashboard',
    description: 'AI macro trader trained on global cycles and narrative shocks — optimized for prediction markets',
    images: ['/og-image.png'],
    creator: '@macrocycleai',
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
  verification: {
    google: 'verification-token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <div id="root">
          {children}
        </div>
        <div id="modal-root" />
        <div id="tooltip-root" />
      </body>
    </html>
  );
}