import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const { country } = params;
  const safeCountry = country || 'global';
  
  return {
    title: `Top GitHub Contributors in ${safeCountry} - Rank Forge`,
    description: `Discover the top GitHub contributors in ${safeCountry}. See rankings, achievements, and open-source contributions from developers in ${safeCountry}.`,
    openGraph: {
      title: `Top GitHub Contributors in ${safeCountry}`,
      description: `Discover the top GitHub contributors in ${safeCountry} on Rank Forge`,
      images: [
        {
          url: `/og-images/${safeCountry.toLowerCase()}.jpg`,
          width: 1200,
          height: 630,
          alt: `Top GitHub Contributors in ${safeCountry}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Top GitHub Contributors in ${safeCountry}`,
      description: `Discover the top GitHub contributors in ${safeCountry} on Rank Forge`,
      images: [
        `/og-images/${safeCountry.toLowerCase()}.jpg`,
      ],
    },
  };
}

export default function RankingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
