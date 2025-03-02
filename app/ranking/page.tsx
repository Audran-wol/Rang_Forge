import type { Metadata } from "next";
import RankingClient from "./ranking-client";
import Script from "next/script";

export const metadata: Metadata = {
  title: "GitHub Developer Rankings - Find Top Developers by Country | Rang Forge",
  description: "Explore GitHub developer rankings worldwide. Find top developers by country, contributions, and influence. Comprehensive GitHub user statistics and rankings updated daily.",
  keywords: ["github rankings", "developer rankings", "github users", "top developers", "developer leaderboard", "github statistics", "country rankings", "developer metrics", "github contributions", "rang forge"],
  alternates: {
    canonical: "https://rang-forge.netlify.app/ranking"
  }
};

export default function RankingPage() {
  // Structured data for the rankings page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "GitHub Developer Rankings by Country",
    "description": "Comprehensive rankings of top GitHub developers organized by country, based on followers, contributions, and impact.",
    "url": "https://rang-forge.netlify.app/ranking",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Top GitHub Developers in Italy",
        "url": "https://rang-forge.netlify.app/ranking?country=Italy"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Top GitHub Developers in United States",
        "url": "https://rang-forge.netlify.app/ranking?country=United%20States"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Top GitHub Developers in India",
        "url": "https://rang-forge.netlify.app/ranking?country=India"
      }
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://rang-forge.netlify.app/ranking"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rang Forge",
      "url": "https://rang-forge.netlify.app"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RankingClient />
    </>
  );
}
