import { GitHubUser, SortCriteria } from './types';

const BASE_URL = 'https://raw.githubusercontent.com/gayanvoice/top-github-users/main/cache';

export async function fetchUsersByCountry(country: string): Promise<GitHubUser[]> {
  try {
    // Convert country name to match URL format (lowercase)
    const formattedCountry = country.toLowerCase();
    const response = await fetch(`${BASE_URL}/${formattedCountry}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user data for ${country}`);
    }
    
    const data = await response.json();
    
    // Transform the data to match our GitHubUser interface
    const transformedUsers: GitHubUser[] = data.users.map((user: any) => ({
      login: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatarUrl,
      location: user.location || country,
      followers: parseInt(user.followers) || 0,
      publicContributions: parseInt(user.publicContributions) || 0,
      privateContributions: parseInt(user.privateContributions) || 0
    }));

    return transformedUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export function sortUsers(users: GitHubUser[], criteria: SortCriteria): GitHubUser[] {
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
}

export function filterUsersByName(users: GitHubUser[], searchQuery: string): GitHubUser[] {
  const query = searchQuery.toLowerCase().trim();
  if (!query) return users;
  
  return users.filter(user => 
    user.name.toLowerCase().includes(query) || 
    user.login.toLowerCase().includes(query)
  );
}

export function getQueryParams(): { country: string; sort: SortCriteria; search: string } {
  if (typeof window === 'undefined') {
    return { country: 'India', sort: 'followers', search: '' };
  }
  
  const params = new URLSearchParams(window.location.search);
  return {
    country: params.get('country') || 'India',
    sort: (params.get('sort') as SortCriteria) || 'followers',
    search: params.get('search') || ''
  };
}

export function updateQueryParams(country: string, sort: SortCriteria, search: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set('country', country);
  url.searchParams.set('sort', sort);
  if (search) {
    url.searchParams.set('search', search);
  } else {
    url.searchParams.delete('search');
  }
  window.history.pushState({}, '', url.toString());
}
