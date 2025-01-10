import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Code2, MapPin } from "lucide-react";
import React from 'react';

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Globe",
    title: "Connect Globally",
    description:
      "Discover and explore top developers from all over the world, gaining insights into their contributions and achievements.",
  },
  {
    icon: "Code2",
    title: "Open Source Insights",
    description:
      "Dive deep into the open-source ecosystem with detailed stats and trends to fuel your innovation and collaborations.",
  },
  {
    icon: "MapPin",
    title: "Interactive Visuals",
    description:
      "Experience dynamic maps and visuals that bring the global developer community to life.",
  },
];

const iconComponents = {
  Globe: Globe,
  Code2: Code2,
  MapPin: MapPin
};

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Why Rang Forge?
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Empowering Open-Source Collaboration
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Rang Forge connects the global developer community, offering unparalleled insights into open-source contributions and achievements.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => {
          const IconComponent = iconComponents[icon as keyof typeof iconComponents];
          return (
            <div key={title}>
              <Card className="h-full bg-background border-0 shadow-none">
                <CardHeader className="flex justify-center items-center">
                  <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                    <IconComponent
                      size={24}
                      className="text-primary"
                    />
                  </div>

                  <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent className="text-muted-foreground text-center">
                  {description}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
};
