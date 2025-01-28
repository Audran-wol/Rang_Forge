"use client";

import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import React from "react";
import Image from "next/image";
import contributors from "../../../app/ranking/top_contributors.json";
import * as flags from 'country-flag-icons/react/3x2';

interface UserProps {
  avatarUrl: string;
  name: string;
  country: string;
  totalContributions: number;
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
  'Nepal': 'NP'
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

const getCountryCode = (country: string): string => {
  // Extract the main country name if there's additional information
  const mainCountry = country.split(',')[0].split('(')[0].trim();
  return countryToCode[mainCountry] || '';
};

const getCountryFlag = (country: string) => {
  const countryCode = getCountryCode(country);
  const Flag = (flags as any)[countryCode];
  return Flag ? <Flag className="w-4 h-4 inline-block" /> : null;
};

const users: UserProps[] = contributors.slice(0, 10).map(contributor => ({
  avatarUrl: contributor.avatarUrl,
  name: contributor.name,
  country: contributor.country,
  totalContributions: contributor.totalContributions
}));

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6">
        Top Global Users
      </h2>

      <div className="mx-auto">
        <Marquee
          className="gap-[4rem]"
          fade
          innerClassName="gap-[4rem]"
          pauseOnHover
        >
          {users.map(({ avatarUrl, name, country, totalContributions }) => (
            <div
              key={name}
              className="flex items-center gap-4 text-xl md:text-2xl font-medium"
            >
              <Image 
                src={avatarUrl}
                alt={name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span>{name}</span>
                <span className="text-sm text-gray-400 flex items-center gap-2">
                  {getCountryFlag(country)} {country} • {formatNumber(totalContributions)} contributions
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
