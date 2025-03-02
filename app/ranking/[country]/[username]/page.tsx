"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ExternalLink, Star, GitFork, Eye, Calendar, MapPin, Users, Code, ThumbsUp } from "lucide-react";
import { GitHubUser } from "../../types";

export async function generateMetadata({ params }: { params: { country: string; username: string } }) {
  // Format country and username for display
  let countryName = params.country.replace(/_/g, ' ');
  countryName = countryName.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  try {
    // Try to load the user data for enhanced metadata
    const formattedCountry = params.country.toLowerCase().replace(/\s+/g, '_');
    const countryData = require(`/country_files/${formattedCountry}.json`);
    const userData = countryData.find((user: GitHubUser) => user.login.toLowerCase() === params.username.toLowerCase());
    
    if (userData) {
      const userName = userData.name || userData.login;
      const userBio = userData.bio || `GitHub developer from ${countryName}`;
      
      // Determine ranking position for title
      const sortedUsers = [...countryData].sort((a, b) => b.followers - a.followers);
      const rank = sortedUsers.findIndex(u => u.login === userData.login) + 1;
      const rankText = rank <= 10 ? `Top ${rank}` : `#${rank} Ranked`;
      
      // More specific title with name first for better name-based search
      const title = `${userName} - ${rankText} GitHub Developer from ${countryName} | Rang Forge`;
      
      // Enhanced description with more specific metrics
      const description = `${userBio}. ${userName} has ${userData.followers.toLocaleString()} followers and ${userData.publicContributions.toLocaleString()} contributions on GitHub. View complete profile, repositories, and ranking on Rang Forge.`;
      
      // Expanded keywords focusing on the developer's name
      const keywords = [
        `${userName}`,
        `${userName} github`,
        `${userName} developer profile`,
        `${userName} ${countryName} developer`,
        `${userName} code`,
        `${userName} programming`,
        `${userName} repositories`,
        `${userName} open source`,
        `${userName} developer stats`,
        `${userName} github ranking`,
        `github developer ${userName}`,
        `${countryName} top developers`,
        `${userName} coding stats`,
        `${userName} software engineer`,
        `${userName} programming metrics`,
        `${userName} open source contributions`,
        `${params.username} github profile`,
        `${countryName} github rankings`,
        `developer leaderboard ${countryName}`
      ];
      
      return {
        title,
        description,
        keywords,
        alternates: {
          canonical: `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}/${params.username.toLowerCase()}`
        },
        openGraph: {
          title: `${userName} - GitHub Developer Profile | ${countryName}`,
          description,
          url: `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}/${params.username.toLowerCase()}`,
          type: "profile",
          images: [
            {
              url: userData.avatarUrl || `/og-images/developer-profile.png`,
              alt: `${userName} - GitHub Developer Profile`,
              width: 1200,
              height: 630,
            }
          ],
          profile: {
            username: userData.login,
            firstName: userName.split(' ')[0],
            lastName: userName.split(' ').length > 1 ? userName.split(' ').slice(1).join(' ') : '',
          }
        },
        twitter: {
          card: "summary_large_image",
          title: `${userName} - GitHub Developer Profile from ${countryName}`,
          description,
          images: [userData.avatarUrl || `/og-images/developer-profile.png`],
          creator: "@rangforge"
        },
        other: {
          "google-site-verification": "YOUR_VERIFICATION_CODE",
          "msvalidate.01": "YOUR_BING_VERIFICATION_CODE"
        }
      };
    }
  } catch (error) {
    console.error("Error loading user data for metadata:", error);
  }
  
  // Fallback metadata if user data couldn't be loaded
  return {
    title: `${params.username} - GitHub Developer Profile from ${countryName} | Rang Forge`,
    description: `View ${params.username}'s GitHub profile, stats, and ranking among ${countryName} developers. Part of Rang Forge's GitHub developer rankings.`,
    keywords: [
      `${params.username}`,
      `${params.username} github`,
      `${params.username} ${countryName} developer`,
      `github developer profile`,
      `${countryName} top developers`,
      `${params.username} coding stats`,
      `open source contributions`,
      `github developer rankings`
    ],
    alternates: {
      canonical: `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}/${params.username.toLowerCase()}`
    }
  };
}

export default function DeveloperProfilePage() {
  const params = useParams();
  const { theme } = useTheme();
  const countrySlug = params.country as string;
  const username = params.username as string;
  
  // Format country name for display
  const countryName = countrySlug
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countryRank, setCountryRank] = useState<number | null>(null);
  
  useEffect(() => {
    async function loadUserData() {
      setLoading(true);
      setError(null);
      
      try {
        // Load country data
        const formattedCountry = countrySlug.toLowerCase().replace(/\s+/g, '_');
        const countryData = require(`/country_files/${formattedCountry}.json`);
        
        // Find user in country data
        const userData = countryData.find((user: GitHubUser) => 
          user.login.toLowerCase() === username.toLowerCase()
        );
        
        if (userData) {
          setUser(userData);
          
          // Calculate user's rank in country
          const sortedUsers = [...countryData].sort((a, b) => b.followers - a.followers);
          const rank = sortedUsers.findIndex(u => u.login === userData.login) + 1;
          setCountryRank(rank);
        } else {
          setError(`Developer ${username} not found in ${countryName} rankings.`);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setError(`Failed to load ${username}'s profile. Please try again later.`);
      } finally {
        setLoading(false);
      }
    }
    
    loadUserData();
  }, [countrySlug, username, countryName]);
  
  // Create structured data for the developer profile
  const jsonLd = user ? {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": user.name || user.login,
    "alternateName": user.login,
    "description": user.bio || `GitHub developer from ${countryName}`,
    "image": user.avatarUrl,
    "url": `https://rang-forge.netlify.app/ranking/${countrySlug}/${username}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://rang-forge.netlify.app/ranking/${countrySlug}/${username}`
    },
    "sameAs": [
      `https://github.com/${user.login}`,
      user.twitterUsername ? `https://twitter.com/${user.twitterUsername}` : null,
      user.websiteUrl || null
    ].filter(Boolean),
    "nationality": countryName,
    "knowsAbout": user.languages || ["programming", "software development", "open source"],
    "jobTitle": user.company ? `Developer at ${user.company}` : "Software Developer",
    "worksFor": user.company ? {
      "@type": "Organization",
      "name": user.company
    } : null,
    "memberOf": [
      {
        "@type": "Organization",
        "name": "GitHub Developer Community"
      },
      {
        "@type": "Organization",
        "name": `${countryName} Developer Community`
      }
    ],
    "subjectOf": {
      "@type": "ItemList",
      "name": `Top GitHub Developers in ${countryName}`,
      "url": `https://rang-forge.netlify.app/ranking/${countrySlug}`
    },
    "award": `Ranked #${countryRank} GitHub developer in ${countryName}`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "GitHub Username",
      "value": user.login
    }
  } : null;
  
  // Additional detailed structured data for rankings
  const rankingJsonLd = user ? {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `GitHub Developer Statistics for ${user.name || user.login}`,
    "description": `Comprehensive GitHub statistics and metrics for ${user.name || user.login}, including followers, contributions, and repository data.`,
    "keywords": [
      "GitHub statistics", 
      `${user.name || user.login} developer profile`, 
      "open source contributions", 
      "developer metrics"
    ],
    "url": `https://rang-forge.netlify.app/ranking/${countrySlug}/${username}`,
    "creator": {
      "@type": "Organization",
      "name": "Rang Forge",
      "url": "https://rang-forge.netlify.app"
    },
    "includedInDataCatalog": {
      "@type": "DataCatalog",
      "name": "Rang Forge GitHub Developer Rankings"
    },
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "GitHub Followers",
        "value": user.followers
      },
      {
        "@type": "PropertyValue",
        "name": "Public Contributions",
        "value": user.publicContributions
      },
      {
        "@type": "PropertyValue",
        "name": "Private Contributions",
        "value": user.privateContributions
      },
      {
        "@type": "PropertyValue",
        "name": "Country Rank",
        "value": countryRank
      }
    ]
  } : null;
  
  return (
    <div className={`flex flex-col min-h-screen ${
      theme === 'dark' ? 'bg-dark-background text-light-text' : 'bg-light-background text-dark-text'
    }`}>
      {jsonLd && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(rankingJsonLd) }}
          />
        </>
      )}
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-4">
          <Link href={`/ranking/${countrySlug}`} className="text-primary hover:underline flex items-center gap-1">
            ← Back to {countryName} Developers
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <Alert variant="destructive" className="my-8">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : user && (
          <>
            <article className="mb-8">
              <header>
                <h1 className="text-3xl font-bold mb-2">{user.name || user.login}</h1>
                <div className="flex flex-wrap items-center gap-2 text-muted-foreground mb-4">
                  <span className="font-medium">@{user.login}</span>
                  {user.location && (
                    <>
                      <span>•</span>
                      <span>{user.location}</span>
                    </>
                  )}
                  {user.company && (
                    <>
                      <span>•</span>
                      <span>{user.company}</span>
                    </>
                  )}
                </div>
              </header>
              
              <Card className="mb-8">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden">
                    <Image
                      src={user.avatarUrl}
                      alt={`${user.name || user.login} - GitHub profile picture`}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <CardTitle className="text-2xl visually-hidden">{user.name || user.login}</CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        Rank #{countryRank} in {countryName}
                      </Badge>
                    </div>
                    {user.bio && (
                      <CardDescription className="mt-2">
                        {user.bio}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                    <Button asChild size="sm">
                      <Link href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <section aria-labelledby="developer-stats">
                    <h2 id="developer-stats" className="text-xl font-medium mb-4">Developer Statistics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="font-medium">{user.followers.toLocaleString()}</span>
                        <span className="text-muted-foreground">Followers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-primary" />
                        <span className="font-medium">{user.publicContributions.toLocaleString()}</span>
                        <span className="text-muted-foreground">Public Contributions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5 text-primary" />
                        <span className="font-medium">{user.privateContributions.toLocaleString()}</span>
                        <span className="text-muted-foreground">Private Contributions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        <span className="font-medium">{(user.stars || 0).toLocaleString()}</span>
                        <span className="text-muted-foreground">Stars</span>
                      </div>
                    </div>
                  </section>
                  
                  <section aria-labelledby="developer-info" className="mt-6">
                    <h2 id="developer-info" className="text-xl font-medium mb-4 visually-hidden">Developer Information</h2>
                    
                    {user.location && (
                      <div className="flex items-center gap-2 text-muted-foreground mt-4">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    
                    {user.createdAt && (
                      <div className="flex items-center gap-2 text-muted-foreground mt-2">
                        <Calendar className="h-4 w-4" />
                        <span>Joined GitHub on {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </section>
                  
                  {user.languages && user.languages.length > 0 && (
                    <section aria-labelledby="developer-languages" className="mt-6">
                      <h2 id="developer-languages" className="text-xl font-medium mb-4">Programming Languages</h2>
                      <div className="flex flex-wrap gap-2">
                        {user.languages.map((language: string) => (
                          <Badge key={language} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  )}
                </CardContent>
              </Card>
              
              <section aria-labelledby="developer-details" className="mb-8">
                <h2 id="developer-details" className="text-2xl font-bold mb-4">GitHub Profile Details</h2>
                <p className="mb-6 text-muted-foreground">
                  {user.name || user.login} is a developer from {countryName}, currently ranked #{countryRank} based on GitHub activity and influence.
                  With {user.followers.toLocaleString()} followers and over {(user.publicContributions + user.privateContributions).toLocaleString()} total contributions,
                  {user.name ? ` ${user.name.split(' ')[0]}` : ' they'} {user.repositories && user.repositories.length > 0 ? `has created ${user.repositories.length} public repositories` : 'is active in open source development'}.
                </p>
                
                <Tabs defaultValue="repositories" className="mb-8">
                  <TabsList className="mb-4">
                    <TabsTrigger value="repositories">Top Repositories</TabsTrigger>
                    <TabsTrigger value="contributions">Contribution Activity</TabsTrigger>
                    <TabsTrigger value="stats">GitHub Stats</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="repositories">
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Repositories</CardTitle>
                        <CardDescription>
                          Most popular repositories from {user.name || user.login}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {user.repositories && user.repositories.length > 0 ? (
                          <div className="grid gap-4">
                            {user.repositories.map((repo: any) => (
                              <div key={repo.name} className="flex flex-col p-4 border rounded-lg">
                                <div className="flex justify-between items-start">
                                  <Link 
                                    href={`https://github.com/${user.login}/${repo.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-primary hover:underline"
                                  >
                                    {repo.name}
                                  </Link>
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">{repo.stars}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <GitFork className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">{repo.forks}</span>
                                    </div>
                                  </div>
                                </div>
                                {repo.description && (
                                  <p className="text-sm text-muted-foreground mt-2">{repo.description}</p>
                                )}
                                {repo.language && (
                                  <Badge variant="outline" className="w-fit mt-3">
                                    {repo.language}
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-center py-8">
                            No repository data available for {user.login}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="contributions">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contribution Activity</CardTitle>
                        <CardDescription>
                          GitHub contribution history for {user.name || user.login}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center py-8">
                          Contribution graph will be displayed here
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="stats">
                    <Card>
                      <CardHeader>
                        <CardTitle>GitHub Statistics</CardTitle>
                        <CardDescription>
                          Detailed GitHub activity statistics for {user.name || user.login}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="font-medium">Contribution Stats</h3>
                            <ul className="space-y-2">
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Total Contributions</span>
                                <span>{(user.publicContributions + user.privateContributions).toLocaleString()}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Public Contributions</span>
                                <span>{user.publicContributions.toLocaleString()}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Private Contributions</span>
                                <span>{user.privateContributions.toLocaleString()}</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="font-medium">Engagement Stats</h3>
                            <ul className="space-y-2">
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Followers</span>
                                <span>{user.followers.toLocaleString()}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Following</span>
                                <span>{user.following.toLocaleString()}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Repositories</span>
                                <span>{user.repositories ? user.repositories.length : 'N/A'}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </section>
              
              <section aria-labelledby="related-developers" className="mb-8">
                <h2 id="related-developers" className="text-2xl font-bold mb-4">More Developers from {countryName}</h2>
                <p className="mb-6 text-muted-foreground">
                  Discover other top GitHub developers from {countryName} who are making significant contributions to open source software.
                </p>
                
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center py-4">
                      <Link 
                        href={`/ranking/${countrySlug}`}
                        className="text-primary hover:underline"
                      >
                        View all {countryName} developers
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              </section>
              
              {/* Add a footer section with additional attribution and metadata */}
              <footer className="text-sm text-muted-foreground border-t pt-4 mt-8">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                  GitHub profile data for {user.name || user.login} is collected and updated daily by Rang Forge.
                  <Link href="/about" className="text-primary hover:underline ml-1">Learn more about our ranking methodology</Link>.
                </p>
              </footer>
            </article>
          </>
        )}
      </div>
    </div>
  );
}
