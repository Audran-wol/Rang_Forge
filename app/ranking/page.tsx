import type { Metadata } from "next";
import RankingClient from "./ranking-client";

export const metadata: Metadata = {
  title: "GitHub Developer Rankings - Find Top Developers by Country | Rang Forge",
  description: "Explore GitHub developer rankings worldwide. Find top developers by country, contributions, and influence. Comprehensive GitHub user statistics and rankings updated daily.",
  keywords: ["github rankings", "developer rankings", "github users", "top developers", "developer leaderboard", "github statistics", "country rankings", "developer metrics", "github contributions", "rang forge"],
  alternates: {
    canonical: "https://rang-forge.netlify.app/ranking"
  }
};

export default function RankingPage() {
  return <RankingClient />;
}
