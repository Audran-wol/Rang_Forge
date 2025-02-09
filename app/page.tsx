import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { Footer } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";

export const metadata = {
  title: "GitHub Rankings - Find Top Developers Worldwide | Rang Forge",
  description: "Discover and compare top GitHub developers globally. View real-time rankings by country, contributions, and influence. Find the most talented developers in your region with our comprehensive GitHub statistics.",
  keywords: [
    "GitHub rankings",
    "top GitHub developers",
    "developer leaderboard",
    "GitHub statistics",
    "open source contributors",
    "developer rankings by country",
    "GitHub user metrics",
    "best developers worldwide",
    "GitHub contribution rankings",
    "developer influence scores"
  ],
  openGraph: {
    type: "website",
    url: "https://rang-forge.netlify.app/",
    title: "GitHub Rankings - Find Top Developers Worldwide | Rang Forge",
    description: "Discover and compare top GitHub developers globally. View real-time rankings by country, contributions, and influence. Find the most talented developers in your region.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitHub Global Developer Rankings",
      },
    ],
    siteName: "GitHub Rankings - Rang Forge",
  },
  twitter: {
    card: "summary_large_image",
    site: "@RangForge",
    creator: "@RangForge",
    title: "GitHub Rankings - Find Top Developers Worldwide | Rang Forge",
    description: "Discover and compare top GitHub developers globally. View real-time rankings by country, contributions, and influence.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GitHub Rankings - Rang Forge",
    url: "https://rang-forge.netlify.app",
    description: "Global GitHub developer rankings and statistics platform",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://rang-forge.netlify.app/ranking?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    about: {
      "@type": "Thing",
      name: "GitHub Developer Rankings",
      description: "Comprehensive platform for discovering and comparing top GitHub developers worldwide"
    },
    audience: {
      "@type": "Audience",
      audienceType: "Developers, Tech Recruiters, Open Source Contributors"
    },
    provider: {
      "@type": "Organization",
      name: "Rang Forge",
      description: "Provider of GitHub developer rankings and statistics"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <TeamSection />
      {/* <CommunitySection /> */}
      {/* <PricingSection /> */}
      <FAQSection />
      <ContactSection />
      <Footer />
    </>
  );
}
