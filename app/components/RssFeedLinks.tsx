'use client';

import Link from 'next/link';
import { useState } from 'react';
import { RssIcon, ChevronDownIcon, ChevronUpIcon, CopyIcon, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type RssFeedLinksProps = {
  country?: string;
  countrySlug?: string;
};

export default function RssFeedLinks({ country, countrySlug }: RssFeedLinksProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  
  const baseUrl = 'https://rang-forge.netlify.app';
  const mainRssFeedUrl = `${baseUrl}/rss.xml`;
  const countryRssFeedUrl = countrySlug ? `${baseUrl}/feeds/${countrySlug}.xml` : null;
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto my-4 border border-border rounded-lg p-4 bg-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2">
              <RssIcon className="h-5 w-5 text-orange-500" />
              <span className="font-medium">RSS Feeds</span>
            </div>
            {isOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-2 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Main RSS Feed</h3>
            <div className="flex items-center justify-between bg-muted/50 rounded p-2">
              <code className="text-xs truncate flex-1">{mainRssFeedUrl}</code>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => copyToClipboard(mainRssFeedUrl, 'main')}
                className="h-8 w-8 p-0"
              >
                {copied === 'main' ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Subscribe to get updates on all country rankings.
            </div>
          </div>
          
          {countryRssFeedUrl && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{country} Developers RSS Feed</h3>
              <div className="flex items-center justify-between bg-muted/50 rounded p-2">
                <code className="text-xs truncate flex-1">{countryRssFeedUrl}</code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard(countryRssFeedUrl, 'country')}
                  className="h-8 w-8 p-0"
                >
                  {copied === 'country' ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                Subscribe to get updates on top GitHub developers from {country}.
              </div>
            </div>
          )}
          
          <div className="pt-2 text-xs text-muted-foreground">
            <Link href="/feeds" className="underline hover:text-primary">
              View all available feeds
            </Link>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
} 