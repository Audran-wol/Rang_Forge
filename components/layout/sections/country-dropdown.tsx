"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function CountryDropdown() {
  const { theme } = useTheme();
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryNames = data.map((country: any) => country.name.common);
        setCountries(countryNames.sort());
      });
  }, []);

  return (
    <Select>
      <SelectTrigger className={`w-[180px] ${
        theme === 'dark' 
          ? 'bg-dark-input text-light-text border-dark-border' 
          : 'bg-light-input text-dark-text border-light-border'
      }`}>
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent className={theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border'}>
        {countries.map((country) => (
          <SelectItem 
            key={country} 
            value={country}
            className={theme === 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-light-hover'}
          >
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
