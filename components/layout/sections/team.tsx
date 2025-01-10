"use client";

import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import { Star, ArrowRight, MapPin } from "lucide-react";
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as flags from 'country-flag-icons/react/3x2';
import topFollowers from "../../../app/ranking/top_followers.json";

interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  rank: number;
  contributions: string;
  githubFollowers: string;
  countryCode: string;
  login: string;
  socialNetworks: SocialNetworkProps[];
}

interface SocialNetworkProps {
  name: string;
  url: string;
}

const countryToCode: { [key: string]: string } = {
  'Azerbaijan': 'AZ',
  'Iran': 'IR',
  'Kenya': 'KE',
  'Vietnam': 'VN',
  'Uruguay': 'UY',
  'Guatemala': 'GT',
  'Serbia': 'RS',
  'Denmark': 'DK',
  'Benin': 'BJ',
  'Cambodia': 'KH',
  'Luxembourg': 'LU',
  'Bolivia': 'BO',
  'China': 'CN',
  'Botswana': 'BW',
  'Philippines': 'PH',
  'Indonesia': 'ID',
  'Morocco': 'MA',
  'Switzerland': 'CH',
  'Turkey': 'TR',
  'Netherlands': 'NL',
  'Pakistan': 'PK',
  'Nepal': 'NP',
  'Australia': 'AU',
  'Singapore': 'SG',
  'India': 'IN',
  'Brazil': 'BR',
  'Germany': 'DE',
  'France': 'FR',
  'United States': 'US',
  'United Kingdom': 'GB',
  'Canada': 'CA',
  'Japan': 'JP'
};

const getCountryCode = (country: string): string => {
  return countryToCode[country] || '';
};

const getCountryFlag = (country: string) => {
  const code = getCountryCode(country);
  if (code && flags[code as keyof typeof flags]) {
    const Flag = flags[code as keyof typeof flags];
    return <Flag className="w-6 h-4" />;
  }
  return null;
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export const TeamSection = () => {
  const teamList: TeamProps[] = topFollowers.slice(0, 16).map(follower => {
    const names = follower.name.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ');

    return {
      imageUrl: follower.avatarUrl,
      firstName,
      lastName,
      login: follower.login,
      rank: follower.followers,
      contributions: formatNumber(follower.totalContributions),
      githubFollowers: formatNumber(follower.followers),
      countryCode: follower.country,
      socialNetworks: [
        {
          name: "Github",
          url: `https://github.com/${follower.login}`,
        },
        follower.twitterUsername !== "undefined value" ? {
          name: "Twitter",
          url: `https://twitter.com/${follower.twitterUsername}`,
        } : null,
        {
          name: "LinkedIn",
          url: `https://www.linkedin.com/in/${follower.login}`,
        },
      ].filter(Boolean) as SocialNetworkProps[]
    };
  });

  const socialIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "X":
      case "Twitter":
        return <XIcon />;
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Top Github Contributors
        </h2>
        <h3 className="text-3xl md:text-4xl text-center font-bold">
          With Highest Number of Followers
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {topFollowers.slice(0, 16).map((follower, index) => (
          <div
            key={follower.login}
            className="group relative bg-card rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            
            {index === 0 && (
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-[0_0_10px_rgba(234,179,8,0.5)] border-2 border-yellow-200 z-10">
                #1
              </div>
            )}
            
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
              <img
                src={follower.avatarUrl}
                alt={follower.name || follower.login}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="relative space-y-2 text-center">
              <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
                <a href={`https://github.com/${follower.login}`} target="_blank">
                  {follower.name || follower.login}
                </a>
              </h4>
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {formatNumber(follower.followers)} followers
                </p>
                {follower.country && getCountryFlag(follower.country)}
              </div>
              
              <div className="flex items-center justify-center gap-3">
                {follower.twitterUsername && follower.twitterUsername !== "undefined value" && (
                  <a
                    href={`https://twitter.com/${follower.twitterUsername}`}
                    target="_blank"
                    className="text-muted-foreground hover:text-[#1DA1F2] transition-colors"
                    title="Twitter"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                )}
                {follower.company && follower.company !== "undefined value" && (
                  <a
                    href={`https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(
                      follower.name || follower.login
                    )}`}
                    target="_blank"
                    className="text-muted-foreground hover:text-[#0A66C2] transition-colors"
                    title="LinkedIn"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={`https://github.com/${follower.login}`}
                  target="_blank"
                  className="text-muted-foreground hover:text-[#2DBA4E] transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="/ranking"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-6"
        >
          See Global Ranking{" "}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
