export interface GitHubUser {
  login: string;
  name: string;
  avatarUrl: string;
  location: string;
  followers: number;
  privateContributions: number;
  publicContributions: number;
}

export type SortCriteria = 'followers' | 'publicContributions' | 'privateContributions';

export interface RankingState {
  country: string;
  sortBy: SortCriteria;
  users: GitHubUser[];
  loading: boolean;
  error: string | null;
}
