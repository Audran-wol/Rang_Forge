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
    default: "Rang Forge - GitHub User Rankings Worldwide",
    template: "%s | Rang Forge"
  },
  description: "Discover and compare top GitHub developers worldwide with Rang Forge. View rankings based on contributions, followers, and achievements. Find the most influential developers in your country.",
  keywords: ['github rankings', 'developer rankings', 'rang forge', 'github leaderboard', 'top developers', 'developer metrics'],
  authors: [{ name: 'Rang Forge Team' }],
  creator: 'Rang Forge',
  publisher: 'Rang Forge',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rang-forge.netlify.app',
    siteName: 'Rang Forge',
    title: 'Rang Forge - GitHub User Rankings Worldwide',
    description: 'Discover and compare top GitHub developers worldwide. Find the most influential developers in your country.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rang Forge - Developer Rankings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rang Forge - GitHub User Rankings Worldwide',
    description: 'Discover and compare top GitHub developers worldwide. Find the most influential developers in your country.',
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
