"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { GraffitiText } from "@/components/cultural/graffiti-text";
import { cn } from "@/lib/utils";

// Location data with city-specific design elements
// Using chrome/gold palette with subtle variations per city
export const locations = [
  {
    id: "los-angeles",
    name: "Los Angeles",
    abbr: "LA",
    state: "California",
    tagline: "The Heart of Lowrider Culture",
    description: "East LA, South Central, Compton - where the culture was born.",
    accentColor: "var(--gold)",
    gradient: "from-[var(--gold)]/20 to-transparent",
    borderClass: "border-[var(--gold)]/50 hover:border-[var(--gold)]",
    textClass: "text-[var(--gold)]",
    neighborhoods: ["East LA", "South Central", "Compton", "Boyle Heights"],
    image: "/images/hero-lowrider.jpg",
  },
  {
    id: "houston",
    name: "Houston",
    abbr: "HTX",
    state: "Texas",
    tagline: "Trill Culture Meets Lowrider",
    description: "H-Town's unique blend of swangas, slabs, and lowriders.",
    accentColor: "var(--chrome)",
    gradient: "from-[var(--chrome)]/20 to-transparent",
    borderClass: "border-[var(--chrome)]/50 hover:border-[var(--chrome)]",
    textClass: "text-[var(--chrome)]",
    neighborhoods: ["Third Ward", "Fifth Ward", "Sunnyside", "South Park"],
    image: "/images/events-carshow.jpg",
  },
  {
    id: "chicago",
    name: "Chicago",
    abbr: "CHI",
    state: "Illinois",
    tagline: "Midwest Lowrider Scene",
    description: "The Chi's growing lowrider movement and car club culture.",
    accentColor: "var(--chrome-light)",
    gradient: "from-[var(--chrome-light)]/20 to-transparent",
    borderClass: "border-[var(--chrome-light)]/50 hover:border-[var(--chrome-light)]",
    textClass: "text-[var(--chrome-light)]",
    neighborhoods: ["Pilsen", "Little Village", "South Side", "Back of the Yards"],
    image: "/images/street-mural.jpg",
  },
];

export function LocationsShowcase() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration - subtle chrome glow */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--gold)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--chrome)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-gold" />
              <span className="text-sm uppercase tracking-widest text-muted-foreground">
                Coast to Coast
              </span>
            </div>
            <GraffitiText
              text="WHERE I WORK"
              variant="chrome"
              size="xl"
              animated={false}
            />
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Documenting the culture from Los Angeles to Houston to Chicago
            </p>
          </motion.div>
        </div>

        {/* Location Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <LocationCard key={location.id} location={location} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface LocationCardProps {
  location: (typeof locations)[0];
  index: number;
}

function LocationCard({ location, index }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link
        href={`/gallery?location=${location.id}`}
        className={cn(
          "group block relative overflow-hidden rounded-2xl border transition-all duration-500",
          "bg-gradient-to-b",
          location.gradient,
          location.borderClass,
          "hover:scale-[1.02]"
        )}
        style={{
          boxShadow: `0 4px 30px ${location.accentColor}15`,
        }}
      >
        {/* Background Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={location.image}
            alt={location.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          {/* City Abbr Watermark - Chrome effect */}
          <div className="absolute top-4 right-4">
            <span
              className="text-6xl font-bold opacity-10 group-hover:opacity-25 transition-opacity chrome-text"
              style={{ fontFamily: "serif" }}
            >
              {location.abbr}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 -mt-12 relative z-10">
          {/* Location Pin */}
          <div
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4",
              "bg-secondary/80 backdrop-blur-sm",
              location.textClass
            )}
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{location.state}</span>
          </div>

          {/* City Name */}
          <h3 className={cn("text-2xl font-bold mb-2", location.textClass)}>
            {location.name}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground mb-4">
            {location.tagline}
          </p>

          {/* Neighborhoods */}
          <div className="flex flex-wrap gap-2 mb-4">
            {location.neighborhoods.slice(0, 3).map((hood) => (
              <span
                key={hood}
                className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground"
              >
                {hood}
              </span>
            ))}
            {location.neighborhoods.length > 3 && (
              <span className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
                +{location.neighborhoods.length - 3} more
              </span>
            )}
          </div>

          {/* View Link */}
          <div
            className={cn(
              "flex items-center gap-2 text-sm font-medium",
              location.textClass,
              "group-hover:gap-3 transition-all"
            )}
          >
            <span>View {location.name} Gallery</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
