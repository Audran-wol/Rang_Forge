import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import React from "react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Award",
    title: "Celebrate Global Talent",
    description:
      "Discover the most influential developers worldwide, organized by country and contribution stats.",
  },
  {
    icon: "User",
    title: "Dive into Profiles",
    description:
      "Access detailed profiles, including followers, repositories, and impactful projects, to learn more about the individuals driving open-source innovation.",
  },
  {
    icon: "Lightbulb",
    title: "Get Inspired",
    description:
      "Explore the journeys of top developers and find motivation to elevate your own GitHub contributions.",
  },
  {
    icon: "TrendingUp",
    title: "Stay Connected",
    description:
      "Stay updated with the latest stats, trends, and insights from the GitHub ecosystem, all in one place.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore the Power of Open Source
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Rang Forge showcases the top GitHub developers across the globe,
            giving you insights into their achievements, profiles, and
            contributions to the open-source community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
