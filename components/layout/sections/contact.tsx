"use client";
import React from "react";
import Link from "next/link";
import { GithubIcon, XIcon } from "lucide-react";
import { Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const contactLinks = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "support@rangforge.io",
      href: "mailto:support@rangforge.io",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      label: "Website",
      value: "rangforge.io",
      href: "https://rangforge.io",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <GithubIcon className="h-6 w-6" />,
      label: "GitHub",
      value: "@rangforge",
      href: "https://github.com/rangforge",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <XIcon className="h-6 w-6" />,
      label: "X (Twitter)",
      value: "@rangforge",
      href: "https://x.com/rangforge",
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="contact" className="container py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 blur-3xl -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-4 mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Get in Touch
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Connect with us through our social channels and join our growing community
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto"
      >
        {contactLinks.map((contact, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="group relative"
          >
            <Link href={contact.href} target="_blank">
              <div className="relative z-10 flex items-center gap-4 bg-background/80 backdrop-blur-sm p-4 rounded-full border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`p-3 rounded-full bg-gradient-to-br ${contact.gradient} text-white`}>
                  {contact.icon}
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground/80 group-hover:text-primary transition-colors">
                    {contact.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {contact.value}
                  </p>
                </div>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${contact.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity rounded-full -z-10`} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
