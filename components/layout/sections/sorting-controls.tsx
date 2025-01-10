"use client";

import { SortCriteria } from "@/app/ranking/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SortingControlsProps {
  currentSort: SortCriteria;
  onSortChange: (criteria: SortCriteria) => void;
}

export function SortingControls({ currentSort, onSortChange }: SortingControlsProps) {
  const sortOptions: { value: SortCriteria; label: string }[] = [
    { value: 'followers', label: 'Followers' },
    { value: 'publicContributions', label: 'Public Contributions' },
    { value: 'privateContributions', label: 'Private Contributions' },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {sortOptions.map((option) => (
        <Button
          key={option.value}
          variant={currentSort === option.value ? "default" : "outline"}
          onClick={() => onSortChange(option.value)}
          className={cn(
            "transition-all",
            currentSort === option.value && "bg-primary text-primary-foreground"
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
