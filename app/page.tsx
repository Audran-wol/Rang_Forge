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
  title: "Rank Forge - Global GitHub Contributor Rankings",
  description: "Discover top GitHub contributors worldwide with Rank Forge. See rankings, achievements, and open-source contributions from developers across the globe.",
  keywords: ["GitHub rankings", "top contributors", "open source", "developer rankings", "GitHub stats"],
  openGraph: {
    type: "website",
    url: "https://rang-forge.netlify.app/",
    title: "Rank Forge - Global GitHub Contributor Rankings",
    description: "Discover top GitHub contributors worldwide with Rank Forge. See rankings, achievements, and open-source contributions from developers across the globe.",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "Rank Forge - Global GitHub Rankings",
      },
    ],
    siteName: "Rank Forge",
  },
  twitter: {
    card: "summary_large_image",
    site: "@RankForge",
    creator: "@RankForge",
    title: "Rank Forge - Global GitHub Contributor Rankings",
    description: "Discover top GitHub contributors worldwide with Rank Forge. See rankings, achievements, and open-source contributions from developers across the globe.",
    images: [
      "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
    ],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rank Forge",
    url: "https://rankforge.com",
    description: "Global GitHub Contributor Rankings and Statistics",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rankforge.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
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
