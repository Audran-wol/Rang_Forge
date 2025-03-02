import Link from 'next/link'
import { Metadata } from 'next'
import { RssIcon, ArrowLeftIcon } from 'lucide-react'

// Available countries (simplified list - should match your available countries)
const availableCountries = [
  'United States', 'India', 'China', 'United Kingdom', 'Germany', 
  'France', 'Brazil', 'Canada', 'Japan', 'Australia',
  'Russia', 'Spain', 'Italy', 'Netherlands', 'Poland',
  'South Korea', 'Turkey', 'Mexico', 'Sweden', 'Switzerland'
]

export const metadata: Metadata = {
  title: 'RSS Feeds | GitHub Developer Rankings | Rang Forge',
  description: 'Subscribe to RSS feeds for GitHub developer rankings by country. Stay updated with the latest changes in developer rankings worldwide.',
  keywords: ['GitHub RSS feeds', 'developer rankings RSS', 'country developer feeds', 'GitHub stats subscription', 'developer rankings updates'],
  alternates: {
    canonical: 'https://rang-forge.netlify.app/feeds',
  },
  openGraph: {
    title: 'RSS Feeds for GitHub Developer Rankings',
    description: 'Subscribe to RSS feeds for GitHub developer rankings by country',
    url: 'https://rang-forge.netlify.app/feeds',
    siteName: 'Rang Forge',
    locale: 'en_US',
    type: 'website',
  },
}

export default function FeedsPage() {
  // Sort countries alphabetically
  const sortedCountries = [...availableCountries].sort()
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">RSS Feeds</h1>
          <p className="text-xl text-muted-foreground">
            Subscribe to stay updated with GitHub developer rankings
          </p>
        </header>
        
        <section className="mb-10">
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <RssIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Main RSS Feed</h2>
                <p className="text-muted-foreground mb-4">
                  Get updates on all country rankings in a single feed
                </p>
                <div className="bg-muted p-3 rounded-md mb-3">
                  <code className="text-sm break-all">
                    https://rang-forge.netlify.app/rss.xml
                  </code>
                </div>
                <div className="text-sm text-muted-foreground">
                  Updated daily with the latest country rankings
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">Country-Specific Feeds</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to get updates for specific countries only. Each feed includes the top 50 developers from that country.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedCountries.map((country) => {
              const countrySlug = country.toLowerCase().replace(/\s+/g, '_')
              return (
                <div key={country} className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <h3 className="font-medium mb-2">{country}</h3>
                  <div className="bg-muted p-2 rounded-md mb-2">
                    <code className="text-xs break-all">
                      https://rang-forge.netlify.app/feeds/{countrySlug}.xml
                    </code>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-muted-foreground">
                      Top 50 developers
                    </span>
                    <Link 
                      href={`/ranking/${countrySlug}`}
                      className="text-xs text-primary hover:underline"
                    >
                      View rankings
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
        
        <section className="mt-12 bg-muted/50 p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">How to Use RSS Feeds</h2>
          <div className="space-y-4 text-sm">
            <p>
              You can subscribe to these RSS feeds using any RSS reader application. Some popular options include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Feedly</li>
              <li>Inoreader</li>
              <li>NewsBlur</li>
              <li>Feedbin</li>
              <li>RSS extensions for browsers</li>
            </ul>
            <p>
              Simply copy the feed URL and add it to your preferred RSS reader to start receiving updates.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
} 