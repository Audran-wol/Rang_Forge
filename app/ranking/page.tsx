"use client";

import { useEffect, useState, useCallback } from "react";
import { ProfileCard } from "@/components/layout/sections/profile-card";
import { SortingControls } from "@/components/layout/sections/sorting-controls";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GitHubUser, SortCriteria, RankingState } from "./types";

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

  const updateQueryParams = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('country', state.country);
    url.searchParams.set('sort', state.sortBy);
    if (searchQuery) {
      url.searchParams.set('search', searchQuery);
    } else {
      url.searchParams.delete('search');
    }
    window.history.pushState({}, '', url.toString());
  }, [state.country, state.sortBy, searchQuery]);

  const loadUsers = useCallback(async (country: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const formattedCountry = country.toLowerCase().replace(/\s+/g, '_');
      const users = require(`/country_files/${formattedCountry}.json`);
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
        error: `Failed to load data for ${country}. Please try again later.`,
      }));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const country = params.get('country') || 'Italy';
    const sort = (params.get('sort') as SortCriteria) || 'followers';
    const search = params.get('search') || '';

    setState(prev => ({ ...prev, country, sortBy: sort }));
    setSearchQuery(search);
    setDebouncedSearchQuery(search);
    loadUsers(country);
  }, [loadUsers]);

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
    const url = new URL(window.location.href);
    url.searchParams.set('sort', criteria);
    window.history.pushState({}, '', url.toString());
    
    setState(prev => ({
      ...prev,
      sortBy: criteria,
      users: sortUsers([...prev.users], criteria)
    }));
  }, []);

  const handleCountryChange = (newCountry: string) => {
    setState(prev => ({ ...prev, country: newCountry }));
    loadUsers(newCountry);
    updateQueryParams();
  };

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
