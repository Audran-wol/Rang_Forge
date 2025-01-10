"use client";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";

export function SearchBar() {
  const { theme } = useTheme();

  return (
    <div className="flex gap-4">
      <Input
        placeholder="Search contributors by name or country..."
        className={`flex-1 ${
          theme === 'dark' 
            ? 'bg-dark-input text-light-text border-dark-border' 
            : 'bg-light-input text-dark-text border-light-border'
        }`}
      />
      <div className="flex gap-2">
        <Button 
          variant="outline"
          className={theme === 'dark' ? 'border-dark-border' : 'border-light-border'}
        >
          America
        </Button>
        <Button 
          variant="outline"
          className={theme === 'dark' ? 'border-dark-border' : 'border-light-border'}
        >
          Russia
        </Button>
        <Button 
          variant="outline"
          className={theme === 'dark' ? 'border-dark-border' : 'border-light-border'}
        >
          Japan
        </Button>
      </div>
    </div>
  );
}
