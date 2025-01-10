"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Code2, Users, Globe2, GitPullRequest, Rocket, Brain } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const featureList: FeatureProps[] = [
  {
    icon: <Code2 className="w-8 h-8 text-primary" />,
    title: "Code Collaboration",
    description: "Connect with skilled developers and collaborate on innovative projects",
    highlight: "Seamless Integration",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Global Network",
    description: "Access a worldwide community of developers ranked by their contributions",
    highlight: "Worldwide Access",
  },
  {
    icon: <Globe2 className="w-8 h-8 text-primary" />,
    title: "Cross-Cultural Exchange",
    description: "Learn from developers across different countries and coding cultures",
    highlight: "Cultural Diversity",
  },
  {
    icon: <GitPullRequest className="w-8 h-8 text-primary" />,
    title: "Project Discovery",
    description: "Find and connect with developers working on exciting open-source projects",
    highlight: "Open Source",
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Career Growth",
    description: "Boost your visibility in the developer community and grow your network",
    highlight: "Professional Growth",
  },
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: "Knowledge Sharing",
    description: "Exchange ideas and best practices with top-ranked developers",
    highlight: "Skill Exchange",
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Platform Benefits
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Connect with Top GitHub Developers
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {featureList.map((feature) => (
            <CarouselItem
              key={feature.title}
              className="md:basis-1/2 lg:basis-1/3 cursor-grab active:cursor-grabbing"
            >
              <Card className="bg-card border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {feature.icon}
                    <span>{feature.title}</span>
                  </CardTitle>
                  <CardDescription>
                    <span className="text-primary font-semibold">{feature.highlight}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
