"use client";

import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import Image from "next/image";
import { GithubIcon, Trophy, Medal, Award } from "lucide-react";
import XIcon from "@/components/icons/x-icon";
import * as flags from 'country-flag-icons/react/3x2';

interface ProfileCardProps {
  profile: {
    login: string;
    name: string;
    avatarUrl: string;
    location: string;
    company?: string;
    twitterUsername?: string;
    followers: number;
    privateContributions: number;
    publicContributions: number;
  };
  rank: number;
  country: string;
}

const countryToCode: { [key: string]: string } = {
  'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'Andorra': 'AD',
  'Angola': 'AO', 'Argentina': 'AR', 'Armenia': 'AM', 'Australia': 'AU',
  'Austria': 'AT', 'Azerbaijan': 'AZ', 'Bahrain': 'BH', 'Bangladesh': 'BD',
  'Belarus': 'BY', 'Belgium': 'BE', 'Benin': 'BJ', 'Bhutan': 'BT',
  'Bolivia': 'BO', 'Bosnia and Herzegovina': 'BA', 'Botswana': 'BW',
  'Brazil': 'BR', 'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI',
  'Cambodia': 'KH', 'Cameroon': 'CM', 'Canada': 'CA', 'Chad': 'TD',
  'Chile': 'CL', 'China': 'CN', 'Colombia': 'CO', 'Congo': 'CG',
  'Croatia': 'HR', 'Cuba': 'CU', 'Cyprus': 'CY', 'Czech Republic': 'CZ',
  'Denmark': 'DK', 'Dominican Republic': 'DO', 'Ecuador': 'EC', 'Egypt': 'EG',
  'El Salvador': 'SV', 'Estonia': 'EE', 'Ethiopia': 'ET', 'Finland': 'FI',
  'France': 'FR', 'Georgia': 'GE', 'Germany': 'DE', 'Ghana': 'GH',
  'Greece': 'GR', 'Guatemala': 'GT', 'Honduras': 'HN', 'Hong Kong': 'HK',
  'Hungary': 'HU', 'Iceland': 'IS', 'India': 'IN', 'Indonesia': 'ID',
  'Iran': 'IR', 'Iraq': 'IQ', 'Ireland': 'IE', 'Israel': 'IL',
  'Italy': 'IT', 'Jamaica': 'JM', 'Japan': 'JP', 'Jordan': 'JO',
  'Kazakhstan': 'KZ', 'Kenya': 'KE', 'Kuwait': 'KW', 'Laos': 'LA',
  'Latvia': 'LV', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Madagascar': 'MG',
  'Malawi': 'MW', 'Malaysia': 'MY', 'Maldives': 'MV', 'Mali': 'ML',
  'Malta': 'MT', 'Mauritania': 'MR', 'Mauritius': 'MU', 'Mexico': 'MX',
  'Moldova': 'MD', 'Mongolia': 'MN', 'Montenegro': 'ME', 'Morocco': 'MA',
  'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA', 'Nepal': 'NP',
  'Netherlands': 'NL', 'New Zealand': 'NZ', 'Nicaragua': 'NI', 'Nigeria': 'NG',
  'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK', 'Palestine': 'PS',
  'Panama': 'PA', 'Paraguay': 'PY', 'Peru': 'PE', 'Philippines': 'PH',
  'Poland': 'PL', 'Portugal': 'PT', 'Qatar': 'QA', 'Romania': 'RO',
  'Russia': 'RU', 'Rwanda': 'RW', 'San Marino': 'SM', 'Saudi Arabia': 'SA',
  'Senegal': 'SN', 'Serbia': 'RS', 'Sierra Leone': 'SL', 'Singapore': 'SG',
  'Slovakia': 'SK', 'Slovenia': 'SI', 'South Africa': 'ZA', 'South Korea': 'KR',
  'Spain': 'ES', 'Sri Lanka': 'LK', 'Sudan': 'SD', 'Sweden': 'SE',
  'Switzerland': 'CH', 'Syria': 'SY', 'Taiwan': 'TW', 'Tanzania': 'TZ',
  'Thailand': 'TH', 'Tunisia': 'TN', 'Turkey': 'TR', 'Uganda': 'UG',
  'Ukraine': 'UA', 'United Arab Emirates': 'AE', 'United Kingdom': 'GB',
  'United States': 'US', 'Uruguay': 'UY', 'Uzbekistan': 'UZ',
  'Venezuela': 'VE', 'Vietnam': 'VN', 'Yemen': 'YE', 'Zambia': 'ZM',
  'Zimbabwe': 'ZW'
};

function getCountryCode(country: string): string {
  return countryToCode[country] || 'UN';
}

function getCountryFlag(country: string) {
  const code = getCountryCode(country);
  // @ts-ignore
  const Flag = flags[code];
  return Flag ? <Flag className="w-6 h-4" /> : null;
}

function getRankBadge(rank: number) {
  if (rank === 1) {
    return <Trophy className="w-8 h-8 text-yellow-500" />;
  } else if (rank === 2) {
    return <Medal className="w-8 h-8 text-gray-400" />;
  } else if (rank === 3) {
    return <Award className="w-8 h-8 text-amber-700" />;
  }
  return <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
    {rank}
  </div>;
}

export function ProfileCard({ profile, rank, country }: ProfileCardProps) {
  const { theme } = useTheme();
  
  return (
    <Card className={`relative p-4 hover:scale-105 transition-transform duration-200 hover:shadow-lg ${
      theme === 'dark' ? 'bg-dark-card text-light-text' : 'bg-light-card text-dark-text'
    }`}>
      <div className="absolute -top-3 -left-3 z-10">
        {getRankBadge(rank)}
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={profile.avatarUrl}
            alt={profile.name || profile.login}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold">{profile.name || profile.login}</h3>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            {getCountryFlag(country)}
            <span>{profile.location || country}</span>
          </div>
          {profile.company && profile.company !== "undefined value" && (
            <p className="text-sm text-muted-foreground mt-1">{profile.company}</p>
          )}
        </div>
        
        <div className="flex flex-col gap-2 text-sm w-full">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Followers</span>
            <span className="font-medium">{profile.followers.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Public Contributions</span>
            <span className="font-medium">{profile.publicContributions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Private Contributions</span>
            <span className="font-medium">{profile.privateContributions.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <a 
            href={`https://github.com/${profile.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          {profile.twitterUsername && profile.twitterUsername !== "undefined value" && (
            <a 
              href={`https://twitter.com/${profile.twitterUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
