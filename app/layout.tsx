import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://rang-forge.netlify.app'),
  verification: {
    google: 'PxLdBJniNOH-1YpAQbB7mQ0M1YdegAiEJljxW7BRgVM',
  },
  title: {
    default: "GitHub Rankings - Global Developer Leaderboard | Rang Forge",
    template: "%s | GitHub Rankings - Rang Forge"
  },
  description: "Explore GitHub rankings and discover top developers worldwide. Compare developers by country, contributions, and influence. Real-time GitHub user statistics and comprehensive developer leaderboard.",
  keywords: [
    'github rankings', 
    'github leaderboard', 
    'top github developers',
    'developer rankings',
    'github user statistics',
    'github contributors ranking',
    'best developers by country',
    'open source contributors',
    'developer metrics',
    'github profile ranking'
  ],
  authors: [{ name: 'Rang Forge Team' }],
  creator: 'Rang Forge',
  publisher: 'Rang Forge',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rang-forge.netlify.app',
    siteName: 'GitHub Rankings - Rang Forge',
    title: 'GitHub Rankings - Global Developer Leaderboard | Rang Forge',
    description: 'Explore GitHub rankings and discover top developers worldwide. Compare developers by country, contributions, and influence. Real-time GitHub user statistics.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GitHub Rankings - Global Developer Leaderboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Rankings - Global Developer Leaderboard | Rang Forge',
    description: 'Explore GitHub rankings and discover top developers worldwide. Compare developers by country, contributions, and influence.',
    images: ['/og-image.png'],
    creator: '@rangforge',
  },
  alternates: {
    canonical: 'https://rang-forge.netlify.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
