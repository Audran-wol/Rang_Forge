"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
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
import type { Metadata } from "next";
import Script from "next/script";

// Function to format country name
function formatCountryName(country: string) {
  return country
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Function to load user data
async function loadUserData(country: string, username: string) {
  try {
    const formattedCountry = country.toLowerCase().replace(/\s+/g, '_');
    const countryData = require(`../../../../country_files/${formattedCountry}.json`);
    const userData = countryData.find((user: any) => user.login.toLowerCase() === username.toLowerCase());
    if (!userData) {
      return null;
    }
    return userData;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { country: string; username: string } }): Promise<Metadata> {
  const userData = await loadUserData(params.country, params.username);
  if (!userData) {
    return {
      title: "Developer Not Found",
      description: "The requested developer profile could not be found."
    };
  }

  const countryName = formatCountryName(params.country);
  const name = userData.name || userData.login;
  const rank = userData.rank || "top";

  return {
    title: `${name} - ${rank} GitHub Developer from ${countryName} | Rang Forge`,
    description: `${name}'s GitHub profile and rankings. ${userData.bio || `View ${name}'s contributions, followers, and impact in the ${countryName} developer community.`}`,
    keywords: [
      name.toLowerCase(),
      userData.login.toLowerCase(),
      `${name.toLowerCase()} github`,
      `${name.toLowerCase()} developer`,
      `${name.toLowerCase()} ${countryName.toLowerCase()}`,
      'github ranking',
      'developer profile',
      countryName.toLowerCase()
    ],
    alternates: {
      canonical: `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}/${params.username.toLowerCase()}`
    }
  };
}

export default async function DeveloperProfilePage({ params }: { params: { country: string; username: string } }) {
  const userData = await loadUserData(params.country, params.username);
  if (!userData) {
    notFound();
  }

  const countryName = formatCountryName(params.country);
  
  // Create structured data for the developer profile
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": userData.name || userData.login,
      "alternateName": userData.login,
      "identifier": userData.id,
      "url": `https://github.com/${userData.login}`,
      "description": userData.bio || `GitHub developer from ${countryName}`,
      "image": userData.avatarUrl,
      "sameAs": [
        `https://github.com/${userData.login}`,
        `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}/${userData.login}`
      ],
      "nationality": countryName,
      "memberOf": {
        "@type": "Organization",
        "name": "GitHub",
        "url": "https://github.com"
      },
      "knowsAbout": userData.languages || ["Software Development", "Open Source"],
      "award": {
        "@type": "Ranking",
        "name": `Top GitHub Developer in ${countryName}`,
        "description": `Ranked based on ${userData.followers.toLocaleString()} followers and ${userData.publicContributions.toLocaleString()} contributions`
      },
      "interactionStatistic": [
        {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/FollowAction",
          "userInteractionCount": userData.followers
        },
        {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/CreateAction",
          "userInteractionCount": userData.publicContributions
        }
      ],
      "worksFor": userData.company ? {
        "@type": "Organization",
        "name": userData.company
      } : undefined,
      "location": userData.location,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}/${userData.login}`
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Rankings",
          "item": "https://rang-forge.netlify.app/ranking"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": `${countryName} Developers`,
          "item": `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": userData.name || userData.login,
          "item": `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}/${userData.login}`
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className={`flex flex-col min-h-screen ${
        theme === 'dark' ? 'bg-dark-background text-light-text' : 'bg-light-background text-dark-text'
      }`}>
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="mb-4">
            <Link href={`/ranking/${params.country}`} className="text-primary hover:underline flex items-center gap-1">
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
          ) : userData && (
            <>
              <article className="mb-8">
                <header>
                  <h1 className="text-3xl font-bold mb-2">{userData.name || userData.login}</h1>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground mb-4">
                    <span className="font-medium">@{userData.login}</span>
                    {userData.location && (
                      <>
                        <span>•</span>
                        <span>{userData.location}</span>
                      </>
                    )}
                    {userData.company && (
                      <>
                        <span>•</span>
                        <span>{userData.company}</span>
                      </>
                    )}
                  </div>
                </header>
                
                <Card className="mb-8">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden">
                      <Image
                        src={userData.avatarUrl}
                        alt={`${userData.name || userData.login} - GitHub profile picture`}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <CardTitle className="text-2xl visually-hidden">{userData.name || userData.login}</CardTitle>
                        <Badge variant="secondary" className="w-fit">
                          Rank #{userData.rank} in {countryName}
                        </Badge>
                      </div>
                      {userData.bio && (
                        <CardDescription className="mt-2">
                          {userData.bio}
                        </CardDescription>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                      <Button asChild size="sm">
                        <Link href={`https://github.com/${userData.login}`} target="_blank" rel="noopener noreferrer">
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
                          <span className="font-medium">{userData.followers.toLocaleString()}</span>
                          <span className="text-muted-foreground">Followers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Code className="h-5 w-5 text-primary" />
                          <span className="font-medium">{userData.publicContributions.toLocaleString()}</span>
                          <span className="text-muted-foreground">Public Contributions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-5 w-5 text-primary" />
                          <span className="font-medium">{userData.privateContributions.toLocaleString()}</span>
                          <span className="text-muted-foreground">Private Contributions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-primary" />
                          <span className="font-medium">{(userData.stars || 0).toLocaleString()}</span>
                          <span className="text-muted-foreground">Stars</span>
                        </div>
                      </div>
                    </section>
                    
                    <section aria-labelledby="developer-info" className="mt-6">
                      <h2 id="developer-info" className="text-xl font-medium mb-4 visually-hidden">Developer Information</h2>
                      
                      {userData.location && (
                        <div className="flex items-center gap-2 text-muted-foreground mt-4">
                          <MapPin className="h-4 w-4" />
                          <span>{userData.location}</span>
                        </div>
                      )}
                      
                      {userData.createdAt && (
                        <div className="flex items-center gap-2 text-muted-foreground mt-2">
                          <Calendar className="h-4 w-4" />
                          <span>Joined GitHub on {new Date(userData.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </section>
                    
                    {userData.languages && userData.languages.length > 0 && (
                      <section aria-labelledby="developer-languages" className="mt-6">
                        <h2 id="developer-languages" className="text-xl font-medium mb-4">Programming Languages</h2>
                        <div className="flex flex-wrap gap-2">
                          {userData.languages.map((language: string) => (
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
                    {userData.name || userData.login} is a developer from {countryName}, currently ranked #{userData.rank} based on GitHub activity and influence.
                    With {userData.followers.toLocaleString()} followers and over {(userData.publicContributions + userData.privateContributions).toLocaleString()} total contributions,
                    {userData.name ? ` ${userData.name.split(' ')[0]}` : ' they'} {userData.repositories && userData.repositories.length > 0 ? `has created ${userData.repositories.length} public repositories` : 'is active in open source development'}.
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
                            Most popular repositories from {userData.name || userData.login}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {userData.repositories && userData.repositories.length > 0 ? (
                            <div className="grid gap-4">
                              {userData.repositories.map((repo: any) => (
                                <div key={repo.name} className="flex flex-col p-4 border rounded-lg">
                                  <div className="flex justify-between items-start">
                                    <Link 
                                      href={`https://github.com/${userData.login}/${repo.name}`}
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
                              No repository data available for {userData.login}
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
                            GitHub contribution history for {userData.name || userData.login}
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
                            Detailed GitHub activity statistics for {userData.name || userData.login}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h3 className="font-medium">Contribution Stats</h3>
                              <ul className="space-y-2">
                                <li className="flex justify-between">
                                  <span className="text-muted-foreground">Total Contributions</span>
                                  <span>{(userData.publicContributions + userData.privateContributions).toLocaleString()}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-muted-foreground">Public Contributions</span>
                                  <span>{userData.publicContributions.toLocaleString()}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-muted-foreground">Private Contributions</span>
                                  <span>{userData.privateContributions.toLocaleString()}</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="space-y-4">
                              <h3 className="font-medium">Engagement Stats</h3>
                              <ul className="space-y-2">
                                <li className="flex justify-between">
                                  <span className="text-muted-foreground">Followers</span>
                                  <span>{userData.followers.toLocaleString()}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-muted-foreground">Following</span>
                                  <span>{userData.following.toLocaleString()}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-muted-foreground">Repositories</span>
                                  <span>{userData.repositories ? userData.repositories.length : 'N/A'}</span>
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
                          href={`/ranking/${params.country}`}
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
                    GitHub profile data for {userData.name || userData.login} is collected and updated daily by Rang Forge.
                    <Link href="/about" className="text-primary hover:underline ml-1">Learn more about our ranking methodology</Link>.
                  </p>
                </footer>
              </article>
            </>
          )}
        </div>
      </div>
    </>
  );
}
