"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraffitiText } from "@/components/cultural/graffiti-text";
import { PinstripeHorizontal } from "@/components/cultural/pinstripe-border";
import { CulturalBackgroundPattern, CornerFlourish } from "@/components/cultural/cultural-icons";
import { galleryCategories } from "@/lib/constants";
import { getFeaturedItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  const featuredItems = getFeaturedItems();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration - subtle geometric pattern */}
      <CulturalBackgroundPattern variant="subtle" density="sparse" />

      {/* Corner flourishes */}
      <div className="absolute top-6 left-6 opacity-30">
        <CornerFlourish position="top-left" size={64} variant="gold" />
      </div>
      <div className="absolute top-6 right-6 opacity-30">
        <CornerFlourish position="top-right" size={64} variant="gold" />
      </div>
      <div className="absolute bottom-6 left-6 opacity-30">
        <CornerFlourish position="bottom-left" size={64} variant="gold" />
      </div>
      <div className="absolute bottom-6 right-6 opacity-30">
        <CornerFlourish position="bottom-right" size={64} variant="gold" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GraffitiText
              text="FEATURED WORK"
              variant="gradient"
              size="xl"
              animated={false}
            />
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A glimpse into the culture, the cars, and the community
            </p>
          </motion.div>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredItems.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/gallery/${item.category}/${item.id}`}>
                <Card className="gallery-card group overflow-hidden bg-card border-border/50 hover:border-[var(--gold)]/50 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-medium bg-[var(--gold)]/80 text-background rounded-full backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>

                      {/* Title on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold text-gold hover:bg-gold/10"
          >
            <Link href="/gallery" className="flex items-center gap-2">
              View All Work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Category Cards Section - Chrome/Gold palette
export function CategoryCards() {
  const categoryColors = {
    "gold": "from-[var(--gold)]/20 to-transparent border-[var(--gold)]/30 hover:border-[var(--gold)]",
    "chrome": "from-[var(--chrome)]/20 to-transparent border-[var(--chrome)]/30 hover:border-[var(--chrome)]",
    "chrome-light": "from-[var(--chrome-light)]/20 to-transparent border-[var(--chrome-light)]/30 hover:border-[var(--chrome-light)]",
    "chrome-dark": "from-[var(--chrome-dark)]/20 to-transparent border-[var(--chrome-dark)]/30 hover:border-[var(--chrome-dark)]",
    "default": "from-[var(--gold)]/15 to-transparent border-[var(--gold)]/20 hover:border-[var(--gold)]/50",
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GraffitiText
              text="EXPLORE"
              variant="chrome"
              size="xl"
              animated={false}
            />
            <p className="mt-4 text-muted-foreground">
              Browse by category
            </p>
          </motion.div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {galleryCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={category.href}>
                <Card
                  className={cn(
                    "group overflow-hidden border bg-gradient-to-b transition-all duration-300",
                    categoryColors[category.color as keyof typeof categoryColors]
                  )}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
