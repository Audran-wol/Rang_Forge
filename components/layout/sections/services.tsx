import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import topContributors from "../../../app/ranking/top_contributors.json";

interface Contributor {
  login: string;
  name: string;
  avatarUrl: string;
  location: string;
  country: string;
  followers: number;
  totalContributions: number;
}

interface ContinentContributors {
  continent: string;
  description: string;
  contributors: Contributor[];
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

const continentMapping: { [key: string]: string[] } = {
  "North America": ["United States", "Canada", "Mexico"],
  "South America": ["Brazil", "Argentina", "Uruguay", "Chile", "Colombia", "Peru", "Bolivia", "Ecuador", "Venezuela", "Paraguay", "Guyana", "Suriname", "French Guiana"],
  "Europe": ["United Kingdom", "France", "Germany", "Spain", "Italy", "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway", "Denmark", "Finland", "Ireland", "Portugal", "Greece", "Poland", "Romania", "Bulgaria", "Hungary", "Czech Republic", "Slovakia", "Croatia", "Serbia", "Slovenia", "Bosnia and Herzegovina", "Montenegro", "Albania", "North Macedonia", "Luxembourg", "Malta", "Iceland", "Estonia", "Latvia", "Lithuania", "Ukraine", "Belarus", "Moldova", "Russia"],
  "Asia": ["China", "Japan", "South Korea", "India", "Indonesia", "Malaysia", "Singapore", "Thailand", "Vietnam", "Philippines", "Taiwan", "Hong Kong", "Macao", "Mongolia", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Uzbekistan", "Afghanistan", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "East Timor", "Laos", "Maldives", "Myanmar", "Nepal", "Pakistan", "Sri Lanka", "Iran", "Iraq", "Israel", "Jordan", "Kuwait", "Lebanon", "Oman", "Palestine", "Qatar", "Saudi Arabia", "Syria", "Turkey", "United Arab Emirates", "Yemen", "Azerbaijan", "Georgia", "Armenia"],
  "Africa": ["South Africa", "Nigeria", "Kenya", "Egypt", "Morocco", "Tunisia", "Algeria", "Ghana", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Cameroon", "Senegal", "Ivory Coast", "Mali", "Burkina Faso", "Benin", "Togo", "Sierra Leone", "Liberia", "Guinea", "Guinea-Bissau", "Gambia", "Cape Verde", "Mauritania", "Niger", "Chad", "Sudan", "South Sudan", "Eritrea", "Djibouti", "Somalia", "Madagascar", "Mauritius", "Seychelles", "Comoros", "Mozambique", "Angola", "Zambia", "Zimbabwe", "Malawi", "Botswana", "Namibia", "Lesotho", "Swaziland", "Congo", "Democratic Republic of the Congo", "Gabon", "Equatorial Guinea", "São Tomé and Príncipe", "Central African Republic", "Burundi"],
  "Oceania": ["Australia", "New Zealand", "Papua New Guinea", "Fiji", "Solomon Islands", "Vanuatu", "New Caledonia", "French Polynesia", "Samoa", "Tonga"]
};

const getContinent = (country: string): string => {
  for (const [continent, countries] of Object.entries(continentMapping)) {
    if (countries.some(c => country.includes(c))) {
      return continent;
    }
  }
  return "Other";
};

export const ServicesSection = () => {
  const continentContributors: ContinentContributors[] = [
    {
      continent: "Asia",
      description: "Discover top contributors from the largest continent",
      contributors: []
    },
    {
      continent: "Europe",
      description: "Meet leading developers from across Europe",
      contributors: []
    },
    {
      continent: "North America",
      description: "Connect with top North American contributors",
      contributors: []
    },
    {
      continent: "Africa",
      description: "Explore Africa's rising tech talents",
      contributors: []
    },
    {
      continent: "South America",
      description: "Find South America's most active developers",
      contributors: []
    },
    {
      continent: "Oceania",
      description: "See Oceania's outstanding contributors",
      contributors: []
    }
  ];

  const isLegitimateContributor = (contributor: Contributor): boolean => {
    // Filter out suspicious profiles with unrealistic commit counts
    if (contributor.totalContributions > 400000) return false;
    
    // Filter out specific known bot profiles
    const suspiciousProfiles = [
      "qabilm", // Unrealistic commit count
      "bugbounted", // Unrealistic commit count
      "0x3EF8", // Unrealistic commit count
      "amdefiguy" // Known bot profile
    ];
    
    if (suspiciousProfiles.includes(contributor.login)) return false;
    
    // Filter out profiles with empty names
    if (!contributor.name || contributor.name.trim() === "") return false;
    
    return true;
  };

  // Group contributors by continent and get top 3 legitimate ones from each
  topContributors
    .filter(isLegitimateContributor)
    .forEach((contributor: Contributor) => {
      const continent = getContinent(contributor.country);
      const continentData = continentContributors.find(c => c.continent === continent);
      if (continentData) {
        continentData.contributors.push(contributor);
        continentData.contributors.sort((a, b) => b.totalContributions - a.totalContributions);
        if (continentData.contributors.length > 3) {
          continentData.contributors.length = 3;
        }
      }
    });

  // Remove continents with no contributors
  const activeContributors = continentContributors.filter(c => c.contributors.length > 0);

  return (
    <section id="services" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Top Contributors by Continent
        </h2>
        <h3 className="text-3xl md:text-4xl text-center font-bold">
          Global Developer Distribution
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeContributors.map(({ continent, description, contributors }) => (
          <Card key={continent} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {continent}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                {contributors.map((contributor, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src={contributor.avatarUrl}
                        alt={contributor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`https://github.com/${contributor.login}`}
                        target="_blank"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {contributor.name}
                      </Link>
                      <div className="text-sm text-muted-foreground truncate">
                        {formatNumber(contributor.totalContributions)} contributions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
