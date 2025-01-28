export const metadata = {
  title: 'Developer Rankings | Rank Forge',
  description: 'Discover top developers rankings worldwide. Find and compare developer contributions, followers, and achievements on Rank Forge.',
  keywords: ['developer rankings', 'programmer rankings', 'github rankings', 'developer leaderboard', 'Rank Forge'],
  openGraph: {
    title: 'Developer Rankings | Rank Forge',
    description: 'Discover top developers rankings worldwide. Compare developer contributions and achievements.',
    type: 'website',
    url: 'https://rankforge.netlify.app/ranking',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rank Forge Developer Rankings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Rankings | Rank Forge',
    description: 'Discover top developers rankings worldwide. Compare developer contributions and achievements.',
    images: ['/og-image.png'],
  },
};

"use client";

import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/layout/sections/profile-card";
import { SortingControls } from "@/components/layout/sections/sorting-controls";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface User {
  login: string;
  name: string;
  avatarUrl: string;
  location: string;
  company?: string;
  twitterUsername?: string;
  followers: number;
  privateContributions: number;
  publicContributions: number;
}

type SortCriteria = 'followers' | 'publicContributions' | 'privateContributions';

interface RankingState {
  country: string;
  sortBy: SortCriteria;
  users: User[];
  loading: boolean;
  error: string | null;
}

const availableCountries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina',
  'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh',
  'Belarus', 'Belgium', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
  'Botswana', 'Brazil', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia',
  'Cameroon', 'Canada', 'Chad', 'Chile', 'China', 'Colombia', 'Congo',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Ethiopia', 'Finland', 'France',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Honduras', 'Hong Kong',
  'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
  'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kuwait', 'Laos', 'Latvia', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico',
  'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Nigeria',
  'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
  'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
  'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tanzania', 'Thailand',
  'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela',
  'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
].filter(country => country !== 'undefined value');

export default function RankingPage() {
  const { theme } = useTheme();
  const [state, setState] = useState<RankingState>({
    country: "Italy",
    sortBy: "followers",
    users: [],
    loading: true,
    error: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const country = params.get('country') || 'Italy';
    const sort = (params.get('sort') as SortCriteria) || 'followers';
    const search = params.get('search') || '';

    setState(prev => ({ ...prev, country, sortBy: sort }));
    setSearchQuery(search);
    setDebouncedSearchQuery(search);
    loadUsers(country);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      updateQueryParams();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const updateQueryParams = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('country', state.country);
    url.searchParams.set('sort', state.sortBy);
    if (searchQuery) {
      url.searchParams.set('search', searchQuery);
    } else {
      url.searchParams.delete('search');
    }
    window.history.pushState({}, '', url.toString());
  };

  const loadUsers = async (country: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const formattedCountry = country.toLowerCase().replace(/\s+/g, '_');
      const response = await fetch(`/country_files/${formattedCountry}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load data for ${country}`);
      }
      const users = await response.json();
      const sortedUsers = sortUsers(users || [], state.sortBy);
      setState(prev => ({
        ...prev,
        users: sortedUsers,
        loading: false,
      }));
    } catch (error) {
      console.error('Error loading users:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: `Failed to load data for ${country}. Please try again later.`,
      }));
    }
  };

  const sortUsers = (users: User[], criteria: SortCriteria): User[] => {
    return [...users].sort((a, b) => {
      switch (criteria) {
        case 'followers':
          return (b.followers || 0) - (a.followers || 0);
        case 'publicContributions':
          return (b.publicContributions || 0) - (a.publicContributions || 0);
        case 'privateContributions':
          return (b.privateContributions || 0) - (a.privateContributions || 0);
        default:
          return 0;
      }
    });
  };

  const handleCountryChange = (newCountry: string) => {
    setState(prev => ({ ...prev, country: newCountry }));
    loadUsers(newCountry);
    updateQueryParams();
  };

  const handleSortChange = (criteria: SortCriteria) => {
    const sortedUsers = sortUsers(state.users, criteria);
    setState(prev => ({
      ...prev,
      sortBy: criteria,
      users: sortedUsers,
    }));
    updateQueryParams();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filterUsers = (users: User[], query: string): User[] => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return users;
    
    return users.filter(user => 
      (user.name && user.name !== "undefined value" && user.name.toLowerCase().includes(searchTerm)) || 
      user.login.toLowerCase().includes(searchTerm)
    );
  };

  const filteredUsers = filterUsers(state.users, debouncedSearchQuery);

  return (
    <div className={`flex flex-col min-h-screen ${
      theme === 'dark' ? 'bg-dark-background text-light-text' : 'bg-light-background text-dark-text'
    }`}>
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center">Top Contributors</h1>
        
        <div className="space-y-8">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <div className="flex flex-col gap-4">
              <label className="text-lg font-medium">Select Country</label>
              <Select
                value={state.country}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {availableCountries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <div className="flex flex-col gap-4">
              <label className="text-lg font-medium">Search by Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search contributors..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <ProfileCard
                    key={user.login}
                    profile={user}
                    rank={index + 1}
                    country={state.country}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No contributors found{debouncedSearchQuery ? ' matching your search' : ''}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
