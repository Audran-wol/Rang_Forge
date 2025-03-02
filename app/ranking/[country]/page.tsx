"use client";

import { useEffect, useState, useCallback } from "react";
import { ProfileCard } from "@/components/layout/sections/profile-card";
import { SortingControls } from "@/components/layout/sections/sorting-controls";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GitHubUser, SortCriteria } from "../types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Link } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import RssFeedLinks from "@/app/components/RssFeedLinks";
import type { Metadata } from "next";
import { headers } from 'next/headers';
import Script from "next/script";

// Function to format country name
function formatCountryName(country: string) {
  return country
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Function to load country data
async function loadCountryData(country: string) {
  try {
    const formattedCountry = country.toLowerCase().replace(/\s+/g, '_');
    const data = require(`../../../country_files/${formattedCountry}.json`);
    return data;
  } catch (error) {
    console.error('Error loading country data:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const countryName = formatCountryName(params.country);
  
  return {
    title: `Top GitHub Developers in ${countryName} | GitHub Rankings ${new Date().getFullYear()}`,
    description: `Discover the most talented GitHub developers from ${countryName}. View comprehensive rankings based on followers, contributions, and community impact. Updated ${new Date().toLocaleDateString()}.`,
    keywords: [
      `github developers ${countryName.toLowerCase()}`,
      `top developers ${countryName.toLowerCase()}`,
      `${countryName.toLowerCase()} programmer rankings`,
      `best github users ${countryName.toLowerCase()}`,
      `${countryName.toLowerCase()} open source contributors`
    ],
    alternates: {
      canonical: `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}`
    }
  };
}

interface CountryPageState {
  sortBy: SortCriteria;
  users: GitHubUser[];
  loading: boolean;
  error: string | null;
}

export default async function CountryPage({ params }: { params: { country: string } }) {
  const countryName = formatCountryName(params.country);
  const users = await loadCountryData(params.country);
  
  // Create structured data for the country rankings
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Top GitHub Developers in ${countryName}`,
    "description": `Comprehensive rankings of the best GitHub developers from ${countryName}, sorted by followers, contributions, and impact.`,
    "url": `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": users.slice(0, 10).map((user: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": user.name || user.login,
          "alternateName": user.login,
          "identifier": user.id,
          "url": `https://github.com/${user.login}`,
          "description": user.bio || `GitHub developer from ${countryName}`,
          "image": user.avatarUrl,
          "sameAs": [
            `https://github.com/${user.login}`,
            `https://rang-forge.netlify.app/ranking/${params.country.toLowerCase()}/${user.login}`
          ],
          "memberOf": {
            "@type": "Organization",
            "name": "GitHub",
            "url": "https://github.com"
          },
          "knowsAbout": user.languages || ["Software Development", "Open Source"],
          "interactionStatistic": [
            {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/FollowAction",
              "userInteractionCount": user.followers
            },
            {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/CreateAction",
              "userInteractionCount": user.publicContributions
            }
          ]
        }
      }))
    },
    "about": {
      "@type": "Thing",
      "name": "GitHub Developer Rankings",
      "description": `Rankings of top GitHub developers from ${countryName} based on followers, contributions, and overall impact in the developer community.`
    },
    "provider": {
      "@type": "Organization",
      "name": "Rang Forge",
      "url": "https://rang-forge.netlify.app"
    }
  };

  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const countrySlug = params.country as string;
  
  const [state, setState] = useState<CountryPageState>({
    sortBy: (searchParams.get('sort') as SortCriteria) || 'followers',
    users: [],
    loading: true,
    error: null,
  });
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const updateQueryParams = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('sort', state.sortBy);
    if (searchQuery) {
      url.searchParams.set('search', searchQuery);
    } else {
      url.searchParams.delete('search');
    }
    window.history.pushState({}, '', url.toString());
  }, [state.sortBy, searchQuery]);

  const loadUsers = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      setState(prev => ({
        ...prev,
        users: sortUsers(users, prev.sortBy),
        loading: false,
      }));
    } catch (error) {
      console.error('Error loading users:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: `Failed to load developer data for ${countryName}. Please try again later.`,
      }));
    }
  }, [countryName, countrySlug]);

  useEffect(() => {
    const sort = (searchParams.get('sort') as SortCriteria) || 'followers';
    const search = searchParams.get('search') || '';

    setState(prev => ({ ...prev, sortBy: sort }));
    setSearchQuery(search);
    setDebouncedSearchQuery(search);
    loadUsers();
  }, [loadUsers, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      updateQueryParams();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, updateQueryParams]);

  const sortUsers = (users: GitHubUser[], criteria: SortCriteria): GitHubUser[] => {
    return [...users].sort((a, b) => {
      switch (criteria) {
        case 'followers':
          return b.followers - a.followers;
        case 'publicContributions':
          return b.publicContributions - a.publicContributions;
        case 'privateContributions':
          return b.privateContributions - a.privateContributions;
        default:
          return 0;
      }
    });
  };

  const handleSortChange = useCallback((criteria: SortCriteria) => {
    setState(prev => ({
      ...prev,
      sortBy: criteria,
      users: sortUsers([...prev.users], criteria)
    }));
    
    updateQueryParams();
  }, [updateQueryParams]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filterUsers = (users: GitHubUser[], query: string): GitHubUser[] => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return users;
    
    return users.filter(user => 
      (user.name && user.name !== "undefined value" && user.name.toLowerCase().includes(searchTerm)) || 
      user.login.toLowerCase().includes(searchTerm)
    );
  };

  const filteredUsers = filterUsers(state.users, debouncedSearchQuery);

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
          <h1 className="text-3xl font-bold mb-8 text-center">Top GitHub Developers in {countryName}</h1>
          <p className="text-muted-foreground text-center mb-8">
            Explore the most talented GitHub developers from {countryName}. Rankings updated daily based on contributions and influence.
          </p>
          
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex flex-col gap-4">
                <label className="text-lg font-medium">Country: <span className="font-bold">{countryName}</span></label>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => router.push('/ranking')}
                    className="text-primary hover:underline"
                  >
                    ← Back to Countries
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex flex-col gap-4">
                <label className="text-lg font-medium">Search Developers</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder={`Search ${countryName} developers...`}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex flex-col gap-4">
                <label className="text-lg font-medium">Sort By</label>
                <SortingControls
                  currentSort={state.sortBy}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>

            {state.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {state.loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <>
                <section aria-labelledby="top-developers">
                  <h2 id="top-developers" className="text-2xl font-bold mb-6">Top {countryName} GitHub Developers</h2>
                  
                  {/* Add RSS Feed Links Component */}
                  <RssFeedLinks country={countryName} countrySlug={countrySlug} />
                  
                  {filteredUsers.length > 0 ? (
                    <>
                      {/* Featured developers section - highlighting top 3 */}
                      {debouncedSearchQuery === "" && (
                        <div className="mb-10">
                          <h3 className="text-xl font-medium mb-4">Featured Developers</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filteredUsers.slice(0, 3).map((user, index) => (
                              <Link 
                                href={`/ranking/${countrySlug}/${user.login}`} 
                                key={user.login}
                                className="block hover:no-underline group"
                              >
                                <Card className="h-full transition-all duration-200 hover:shadow-md group-hover:border-primary">
                                  <CardHeader>
                                    <div className="flex items-center gap-4">
                                      <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden">
                                        <Image
                                          src={user.avatarUrl}
                                          alt={user.name || user.login}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div>
                                        <CardTitle className="group-hover:text-primary transition-colors">
                                          {user.name || user.login}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                          @{user.login}
                                        </CardDescription>
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex justify-between items-center">
                                      <div className="flex flex-col">
                                        <span className="text-2xl font-bold">{index + 1}</span>
                                        <span className="text-xs text-muted-foreground">Rank</span>
                                      </div>
                                      <div className="flex flex-col items-end">
                                        <span className="text-lg font-medium">{user.followers.toLocaleString()}</span>
                                        <span className="text-xs text-muted-foreground">Followers</span>
                                      </div>
                                    </div>
                                    
                                    {user.bio && (
                                      <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                                        {user.bio}
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Full developer listing */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredUsers.map((user, index) => (
                          <ProfileCard
                            key={user.login}
                            profile={user}
                            rank={index + 1}
                            country={countryName}
                          />
                        ))}
                      </div>
                      
                      {/* SEO-friendly footer with links to most popular developers */}
                      {filteredUsers.length > 10 && debouncedSearchQuery === "" && (
                        <div className="mt-12 pt-8 border-t">
                          <h3 className="text-lg font-medium mb-4">Popular {countryName} Developers</h3>
                          <div className="flex flex-wrap gap-2">
                            {filteredUsers.slice(0, 15).map(user => (
                              <Link 
                                key={user.login} 
                                href={`/ranking/${countrySlug}/${user.login}`}
                                className="text-primary hover:underline px-2 py-1 text-sm"
                              >
                                {user.name || user.login}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No developers found{debouncedSearchQuery ? ' matching your search' : ''} in {countryName}
                    </div>
                  )}
                </section>
                
                {/* Add a section with related countries */}
                <section aria-labelledby="related-countries" className="mt-16 pt-8 border-t">
                  <h2 id="related-countries" className="text-xl font-bold mb-4">Explore Developers in Other Countries</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {availableCountries
                      .filter(c => c.toLowerCase() !== countryName.toLowerCase())
                      .sort(() => 0.5 - Math.random()) // Randomize order
                      .slice(0, 12) // Take 12 random countries
                      .map(country => {
                        const countrySlug = country.toLowerCase().replace(/\s+/g, '_');
                        return (
                          <Link 
                            href={`/ranking/${countrySlug}`} 
                            key={country}
                            className="px-3 py-2 border rounded-md text-center hover:bg-card hover:text-primary transition-colors"
                          >
                            {country}
                          </Link>
                        );
                      })
                    }
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 